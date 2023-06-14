import { PartialType } from '@nestjs/swagger';
import { ReqUploadDto } from './req-upload.dto';

export class ResUploadDto extends PartialType(ReqUploadDto) {}
