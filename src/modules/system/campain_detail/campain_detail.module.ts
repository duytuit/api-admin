import { Module } from '@nestjs/common';
import { CampainDetailService } from './campain_detail.service';
import { CampainDetailController } from './campain_detail.controller';
import { CampainDetail } from './entities/campain_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CampainDetail])],
  controllers: [CampainDetailController],
  providers: [CampainDetailService],
  exports: [CampainDetailService],
})
export class CampainDetailModule {}
