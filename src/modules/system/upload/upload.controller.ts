import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { ResUploadDto } from './dto/res-upload.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ReqUpdateUploadDto, ReqUploadDto } from './dto/req-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AjaxResult } from 'src/common/class/ajax-result.class';

@ApiTags('sự thông báo')
@Public()
@Controller('system/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FilesInterceptor('files'))
  @Post('create')
  async create(
    @Body() body: any,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    return await this.uploadService.add(files, body);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string[]) {
    return this.uploadService.remove(id);
  }
}
