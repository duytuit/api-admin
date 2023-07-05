import { Injectable } from '@nestjs/common';
import { CreateDebitDto, ReqDebitList } from './dto/req-debit.dto';
import { UpdateDebitDto } from './dto/res-debit.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Debit } from './entities/debit.entity';

@Injectable()
export class DebitService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Debit)
    private readonly DebitRepository: Repository<Debit>,
  ) {}
  async addOrUpdate(CreateDebitDto: CreateDebitDto) {
    return await this.DebitRepository.save(CreateDebitDto);
  }
  async list(req, ReqDebitList: ReqDebitList): Promise<PaginatedDto<Debit>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Debit> = {};
      // if (reqDebitList.name) {
      //   where.name = Like(`%${reqDebitList.name}%`);
      // }
      const result = await this.DebitRepository.findAndCount({
        where,
        skip: ReqDebitList.skip,
        take: ReqDebitList.take,
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
  create(createDebitDto: CreateDebitDto) {
    return 'This action adds a new debit';
  }

  findAll() {
    return `This action returns all debit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debit`;
  }

  update(id: number, updateDebitDto: UpdateDebitDto) {
    return `This action updates a #${id} debit`;
  }

  remove(id: number) {
    return `This action removes a #${id} debit`;
  }
}
