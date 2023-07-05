import { Injectable } from '@nestjs/common';
import {
  CreatePaymentDetailDto,
  ReqPaymentDetailList,
} from './dto/req-payment_detail.dto';
import { UpdatePaymentDetailDto } from './dto/res-payment_detail.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { PaymentDetail } from './entities/payment_detail.entity';

@Injectable()
export class PaymentDetailService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(PaymentDetail)
    private readonly PaymentDetailRepository: Repository<PaymentDetail>,
  ) {}
  async addOrUpdate(CreatePaymentDetailDto: CreatePaymentDetailDto) {
    return await this.PaymentDetailRepository.save(CreatePaymentDetailDto);
  }
  async list(
    req,
    ReqPaymentDetailList: ReqPaymentDetailList,
  ): Promise<PaginatedDto<PaymentDetail>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<PaymentDetail> = {};
      // if (reqPaymentDetailList.name) {
      //   where.name = Like(`%${reqPaymentDetailList.name}%`);
      // }
      const result = await this.PaymentDetailRepository.findAndCount({
        where,
        skip: ReqPaymentDetailList.skip,
        take: ReqPaymentDetailList.take,
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
  create(createPaymentDetailDto: CreatePaymentDetailDto) {
    return 'This action adds a new paymentDetail';
  }

  findAll() {
    return `This action returns all paymentDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentDetail`;
  }

  update(id: number, updatePaymentDetailDto: UpdatePaymentDetailDto) {
    return `This action updates a #${id} paymentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentDetail`;
  }
}
