import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
  imports: [TypeOrmModule.forFeature([Currency])],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
