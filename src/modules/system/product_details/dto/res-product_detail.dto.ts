import { PartialType } from '@nestjs/swagger';
import { CreateProductDetailDto } from './req-product_detail.dto';

export class UpdateProductDetailDto extends PartialType(
  CreateProductDetailDto,
) {}
