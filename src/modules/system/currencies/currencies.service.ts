import { Injectable } from '@nestjs/common';
import {
  CreateCurrencyDto,
  ReqCurrencyList,
  UpdateCurrencyDto,
} from './dto/req-currency.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Currency)
    private readonly CurrencyRepository: Repository<Currency>,
  ) {}
  async addOrUpdate(CreateCurrencyDto: CreateCurrencyDto) {
    return await this.CurrencyRepository.save(CreateCurrencyDto);
  }
  async list(
    req,
    reqCurrencyList: ReqCurrencyList,
  ): Promise<PaginatedDto<Currency>> {
    const rs_list = await this.redis.get('currency' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Currency> = {};
      if (reqCurrencyList.remark) {
        where.remark = reqCurrencyList.remark;
      }
      const result = await this.CurrencyRepository.findAndCount({
        where,
        skip: reqCurrencyList.skip,
        take: reqCurrencyList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        'currency' + req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
