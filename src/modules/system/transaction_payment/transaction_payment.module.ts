import { Module } from '@nestjs/common';
import { TransactionPaymentService } from './transaction_payment.service';
import { TransactionPaymentController } from './transaction_payment.controller';
import { TransactionPayment } from './entities/transaction_payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionPayment])],
  controllers: [TransactionPaymentController],
  providers: [TransactionPaymentService],
  exports: [TransactionPaymentService],
})
export class TransactionPaymentModule {}
