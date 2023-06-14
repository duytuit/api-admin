import { OmitType } from '@nestjs/swagger';
import { ProductDetail } from '../entities/product_detail.entity';

export class CreateProductDetailDto extends OmitType(ProductDetail, [
  'id',
] as const) {}
export class UpdateProductDetailDto extends ProductDetail {}
