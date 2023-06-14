import { OmitType } from '@nestjs/swagger';
import { Upload } from '../entities/upload.entity';
import { IsString } from 'class-validator';

export class ReqUploadDto extends OmitType(Upload, ['uploadId'] as const) {
  @IsString()
  path_file?: string;
}
export class ReqUpdateUploadDto extends Upload {
  @IsString()
  path_file?: string;
}
