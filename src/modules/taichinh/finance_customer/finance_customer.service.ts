import { Injectable } from '@nestjs/common';
import {
  CreateFinanceCustomerDto,
  ReqFinanceCustomerList,
} from './dto/req-finance_customer.dto';
import { UpdateFinanceCustomerDto } from './dto/res-finance_customer.dto';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { FinanceCustomer } from './entities/finance_customer.entity';
import { Helper } from 'src/common/utils/helper';

@Injectable()
export class FinanceCustomerService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(FinanceCustomer)
    private readonly FinanceCustomerRepository: Repository<FinanceCustomer>,
  ) {}
  async addOrUpdate(CreateFinanceCustomerDto: CreateFinanceCustomerDto) {
    const keys = await this.redis.keys('*FinanceCustomer*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    return await this.FinanceCustomerRepository.save(CreateFinanceCustomerDto);
  }
  async list(
    req,
    ReqFinanceCustomerList: ReqFinanceCustomerList,
  ): Promise<PaginatedDto<FinanceCustomer>> {
    const rs_list = await this.redis.get('FinanceCustomer' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<FinanceCustomer> = {};
      if (ReqFinanceCustomerList.customer_name) {
        where.customerName = Like(`%${ReqFinanceCustomerList.customer_name}%`);
      }
      const result = await this.FinanceCustomerRepository.findAndCount({
        where,
        order: {
          id: 'DESC',
        },
        skip: ReqFinanceCustomerList.skip,
        take: ReqFinanceCustomerList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        'FinanceCustomer' + req.originalUrl,
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
    const keys = await this.redis.keys('*FinanceCustomer*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.FinanceCustomerRepository.createQueryBuilder('FinanceCustomer')
      .update()
      .set({
        status: ReqChangeStatusDto.status,
      })
      .where({ id: ReqChangeStatusDto.id })
      .execute();
  }
  async remove(body: any) {
    const keys = await this.redis.keys('*FinanceCustomer*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.FinanceCustomerRepository.createQueryBuilder('FinanceCustomer')
      .softDelete()
      .where({ id: body.id, projectId: body.projectId })
      .execute();
  }
}
