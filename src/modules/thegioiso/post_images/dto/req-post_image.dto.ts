import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Post_Images } from '../entities/post_image.entity';

export class CreatePostImageDto extends OmitType(Post_Images, [
  'id',
] as const) {}
export class UpdatePostImageDto extends Post_Images {}
export class ReqPostImageList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
