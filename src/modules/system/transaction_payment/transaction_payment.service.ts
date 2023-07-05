import { Injectable } from '@nestjs/common';
import {
  CreateTransactionPaymentDto,
  ReqTransactionPaymentList,
  UpdateTransactionPaymentDto,
} from './dto/req-transaction_payment.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { TransactionPayment } from './entities/transaction_payment.entity';

@Injectable()
export class TransactionPaymentService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(TransactionPayment)
    private readonly TransactionPaymentRepository: Repository<TransactionPayment>,
  ) {}
  async addOrUpdate(CreateTransactionPaymentDto: CreateTransactionPaymentDto) {
    return await this.TransactionPaymentRepository.save(
      CreateTransactionPaymentDto,
    );
  }
  async list(
    req,
    ReqTransactionPaymentList: ReqTransactionPaymentList,
  ): Promise<PaginatedDto<TransactionPayment>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<TransactionPayment> = {};
      // if (reqTransactionPaymentList.name) {
      //   where.name = Like(`%${reqTransactionPaymentList.name}%`);
      // }
      const result = await this.TransactionPaymentRepository.findAndCount({
        where,
        skip: ReqTransactionPaymentList.skip,
        take: ReqTransactionPaymentList.take,
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
  create(createTransactionPaymentDto: CreateTransactionPaymentDto) {
    return 'This action adds a new transactionPayment';
  }

  findAll() {
    return `This action returns all transactionPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionPayment`;
  }

  update(id: number, updateTransactionPaymentDto: UpdateTransactionPaymentDto) {
    return `This action updates a #${id} transactionPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionPayment`;
  }
}
