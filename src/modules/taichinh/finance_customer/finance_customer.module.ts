import { Module } from '@nestjs/common';
import { FinanceCustomerService } from './finance_customer.service';
import { FinanceCustomerController } from './finance_customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanceCustomer } from './entities/finance_customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinanceCustomer])],
  controllers: [FinanceCustomerController],
  providers: [FinanceCustomerService],
  exports: [FinanceCustomerService],
})
export class FinanceCustomerModule {}
