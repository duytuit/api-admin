import { Module } from '@nestjs/common';
import { CustomerCareService } from './customer_care.service';
import { CustomerCareController } from './customer_care.controller';

@Module({
  controllers: [CustomerCareController],
  providers: [CustomerCareService]
})
export class CustomerCareModule {}
