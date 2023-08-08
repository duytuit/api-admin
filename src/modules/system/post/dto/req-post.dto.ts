import { OmitType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Post } from '../entities/post.entity';
import { Type } from 'class-transformer';

/* Bài viết */
export class ReqAddPostDto extends OmitType(Post, ['id'] as const) {}

export class UpdatePostDto extends Post {}

/* Truy vấn phân trang */
export class ReqPostListDto extends PaginationDto {
  /* ID */
  @IsOptional()
  @IsString()
  id: string;
  /* Mã bài viết */
  @IsOptional()
  @IsString()
  postCode?: string;

  /* Tên vị trí */
  @IsOptional()
  @IsString()
  postName?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsNumber()
  @Type()
  projectId: number;

  @IsNumber()
  @Type()
  @IsOptional()
  categoryId: number;

  /* Trạng thái */
  @IsOptional()
  @IsString()
  status?: number;
}
