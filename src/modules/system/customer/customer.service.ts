import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreateCurrencyDto } from '../currencies/dto/req-currency.dto';
import {
  ReqCustomerList,
  CreateCustomerDto,
  UpdateCustomerDto,
} from './dto/req-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Customer)
    private readonly CustomerRepository: Repository<Customer>,
  ) {}
  async addOrUpdate(CreateCustomerDto: CreateCustomerDto) {
    return await this.CustomerRepository.save(CreateCustomerDto);
  }
  async list(
    req,
    ReqCustomerList: ReqCustomerList,
  ): Promise<PaginatedDto<Customer>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Customer> = {};
      // if (reqCustomerList.name) {
      //   where.name = Like(`%${reqCustomerList.name}%`);
      // }
      const result = await this.CustomerRepository.findAndCount({
        where,
        skip: ReqCustomerList.skip,
        take: ReqCustomerList.take,
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
  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
