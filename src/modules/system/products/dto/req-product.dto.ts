import { OmitType } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Type } from 'class-transformer';

export class CreateProductDto extends OmitType(Product, ['id'] as const) {}
export class UpdateProductDto extends Product {}
export class ReqProductList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;

  @IsNumber()
  @Type()
  projectId: number;
}
