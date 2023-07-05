import { Injectable } from '@nestjs/common';
import { CreateReceiptDto, ReqReceiptList } from './dto/req-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Receipt } from './entities/receipt.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Receipt)
    private readonly ReceiptRepository: Repository<Receipt>,
  ) {}
  async addOrUpdate(CreateReceiptDto: CreateReceiptDto) {
    return await this.ReceiptRepository.save(CreateReceiptDto);
  }
  async list(
    req,
    ReqReceiptList: ReqReceiptList,
  ): Promise<PaginatedDto<Receipt>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Receipt> = {};
      // if (reqReceiptList.name) {
      //   where.name = Like(`%${reqReceiptList.name}%`);
      // }
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
        req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  create(createReceiptDto: CreateReceiptDto) {
    return 'This action adds a new receipt';
  }

  findAll() {
    return `This action returns all receipt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receipt`;
  }

  update(id: number, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} receipt`;
  }
}
