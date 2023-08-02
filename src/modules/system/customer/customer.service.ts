import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { CreateCurrencyDto } from '../currencies/dto/req-currency.dto';
import {
  ReqCustomerList,
  CreateCustomerDto,
  UpdateCustomerDto,
} from './dto/req-customer.dto';
import { Customer } from './entities/customer.entity';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Customer)
    private readonly CustomerRepository: Repository<Customer>,
  ) {}
  async addOrUpdate(CreateCustomerDto: CreateCustomerDto) {
    const keys = await this.redis.keys('*customer*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    return await this.CustomerRepository.save(CreateCustomerDto);
  }
  async list(
    req,
    ReqCustomerList: ReqCustomerList,
  ): Promise<PaginatedDto<Customer>> {
    const rs_list = await this.redis.get('customer' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Customer> = {};
      if (ReqCustomerList.name) {
        where.full_name = Like(`%${ReqCustomerList.name}%`);
      }
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
        'customer' + req.originalUrl,
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
    const keys = await this.redis.keys('*customer*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.CustomerRepository.createQueryBuilder('customer')
      .update()
      .set({
        status: ReqChangeStatusDto.status,
      })
      .where({ id: ReqChangeStatusDto.id })
      .execute();
  }
  async remove(body: any) {
    const keys = await this.redis.keys('*customer*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.CustomerRepository.createQueryBuilder('customer')
      .softDelete()
      .where({ id: body.id, projectId: body.projectId })
      .execute();
  }
}
