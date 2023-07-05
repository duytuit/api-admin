import { Module } from '@nestjs/common';
import { CampainService } from './campain.service';
import { CampainController } from './campain.controller';
import { Campain } from './entities/campain.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Campain])],
  controllers: [CampainController],
  providers: [CampainService],
  exports: [CampainService],
})
export class CampainModule {}
