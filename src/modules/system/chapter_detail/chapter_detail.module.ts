import { Module } from '@nestjs/common';
import { ChapterDetailService } from './chapter_detail.service';
import { ChapterDetailController } from './chapter_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChapterDetail } from './entities/chapter_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterDetail])],
  controllers: [ChapterDetailController],
  providers: [ChapterDetailService],
  exports: [ChapterDetailService],
})
export class ChapterDetailModule {}
