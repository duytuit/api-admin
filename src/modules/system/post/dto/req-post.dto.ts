import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Post } from '../entities/post.entity';

/* Bài viết */
export class ReqAddPostDto extends OmitType(Post, ['postId'] as const) {}

/* Truy vấn phân trang */
export class ReqPostListDto extends PaginationDto {
  /* Mã bài viết */
  @IsOptional()
  @IsString()
  postCode?: string;

  /* Tên vị trí */
  @IsOptional()
  @IsString()
  postName?: string;

  /* Trạng thái */
  @IsOptional()
  @IsString()
  status?: string;
}
