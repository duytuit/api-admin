import { Injectable } from '@nestjs/common';
import { CreateReceiptDto, ReqReceiptList } from './dto/req-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Receipt } from './entities/receipt.entity';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Receipt)
    private readonly ReceiptRepository: Repository<Receipt>,
  ) {}
  async addOrUpdate(CreateReceiptDto: CreateReceiptDto) {
    const keys = await this.redis.keys('*receipt*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    return await this.ReceiptRepository.save(CreateReceiptDto);
  }
  async list(
    req,
    ReqReceiptList: ReqReceiptList,
  ): Promise<PaginatedDto<Receipt>> {
    const rs_list = await this.redis.get('receipt' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Receipt> = {};
      if (ReqReceiptList.name) {
        where.customerName = Like(`%${ReqReceiptList.name}%`);
      }
      const result = await this.ReceiptRepository.findAndCount({
        where,
        skip: ReqReceiptList.skip,
        take: ReqReceiptList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        'receipt' + req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  async changeStatus(
    ReqChangeStatusDto: ReqChangeStatusDto,
    updateBy?: string,
  ) {
    const keys = await this.redis.keys('*receipt*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.ReceiptRepository.createQueryBuilder('receipt')
      .update()
      .set({
        status: ReqChangeStatusDto.status,
      })
      .where({ id: ReqChangeStatusDto.id })
      .execute();
  }
  async remove(body: any) {
    const keys = await this.redis.keys('*receipt*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.ReceiptRepository.createQueryBuilder('receipt')
      .softDelete()
      .where({ id: body.id, projectId: body.projectId })
      .execute();
  }
}
