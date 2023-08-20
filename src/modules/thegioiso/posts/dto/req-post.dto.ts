import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { Posts } from '../entities/post.entity';

export class CreatePostDto extends OmitType(Posts, ['id'] as const) {}
export class UpdatePostDto extends Posts {}
export class ReqPostList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  title: string;
}
