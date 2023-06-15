import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChapterDetailService } from './chapter_detail.service';
import { CreateChapterDetailDto } from './dto/req-chapter_detail.dto';
import { UpdateChapterDetailDto } from './dto/res-chapter_detail.dto';

@Controller('chapter-detail')
export class ChapterDetailController {
  constructor(private readonly chapterDetailService: ChapterDetailService) {}

  @Post()
  create(@Body() createChapterDetailDto: CreateChapterDetailDto) {
    // return this.chapterDetailService.create(createChapterDetailDto);
  }

  @Get()
  findAll() {
    // return this.chapterDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChapterDetailDto: UpdateChapterDetailDto,
  ) {
    // return this.chapterDetailService.update(+id, updateChapterDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterDetailService.remove(+id);
  }
}
