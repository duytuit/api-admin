import { Injectable } from '@nestjs/common';
import { CreateBillDto, ReqBillList } from './dto/req-bill.dto';
import { UpdateBillDto } from './dto/res-bill.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Bill)
    private readonly BillRepository: Repository<Bill>,
  ) {}
  async addOrUpdate(CreateBillDto: CreateBillDto) {
    const keys = await this.redis.keys('*bill*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    return await this.BillRepository.save(CreateBillDto);
  }
  async list(req, ReqBillList: ReqBillList): Promise<PaginatedDto<Bill>> {
    const rs_list = await this.redis.get('bill' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Bill> = {};
      if (ReqBillList.name) {
        where.customerName = Like(`%${ReqBillList.name}%`);
      }
      const result = await this.BillRepository.findAndCount({
        where,
        skip: ReqBillList.skip,
        take: ReqBillList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        'bill' + req.originalUrl,
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
    const keys = await this.redis.keys('*bill*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.BillRepository.createQueryBuilder('bill')
      .update()
      .set({
        status: ReqChangeStatusDto.status,
      })
      .where({ id: ReqChangeStatusDto.id })
      .execute();
  }
  async remove(body: any) {
    const keys = await this.redis.keys('*bill*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.BillRepository.createQueryBuilder('bill')
      .softDelete()
      .where({ id: body.id, projectId: body.projectId })
      .execute();
  }
}
