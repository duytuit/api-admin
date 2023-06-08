/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
@ApiTags('Tải lên tệp')
@Controller('common')
@Public()
export class UploadController {
  /* Tải lên tệp đơn */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('fileName') fileName,
  ) {
    return {
      fileName,
      originalname: file.originalname,
      mimetype: file.mimetype,
    };
  }

  /* Tải lên tệp tải lên */
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFils(@UploadedFiles() files: Array<Express.Multer.File>) {
    /* Không xử lý */
    return files;
  }
}
