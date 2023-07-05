import { Module } from '@nestjs/common';
import { DebitService } from './debit.service';
import { DebitController } from './debit.controller';
import { Debit } from './entities/debit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Debit])],
  controllers: [DebitController],
  providers: [DebitService],
  exports: [DebitService],
})
export class DebitModule {}
