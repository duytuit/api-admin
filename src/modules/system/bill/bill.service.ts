import { Injectable } from '@nestjs/common';
import { CreateBillDto, ReqBillList } from './dto/req-bill.dto';
import { UpdateBillDto } from './dto/res-bill.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Bill)
    private readonly BillRepository: Repository<Bill>,
  ) {}
  async addOrUpdate(CreateBillDto: CreateBillDto) {
    return await this.BillRepository.save(CreateBillDto);
  }
  async list(req, ReqBillList: ReqBillList): Promise<PaginatedDto<Bill>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Bill> = {};
      // if (reqBillList.name) {
      //   where.name = Like(`%${reqBillList.name}%`);
      // }
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
        req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  create(createBillDto: CreateBillDto) {
    return 'This action adds a new bill';
  }

  findAll() {
    return `This action returns all bill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
