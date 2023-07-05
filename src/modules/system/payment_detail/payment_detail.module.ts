import { Module } from '@nestjs/common';
import { PaymentDetailService } from './payment_detail.service';
import { PaymentDetailController } from './payment_detail.controller';
import { PaymentDetail } from './entities/payment_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentDetail])],
  controllers: [PaymentDetailController],
  providers: [PaymentDetailService],
  exports: [PaymentDetailService],
})
export class PaymentDetailModule {}
