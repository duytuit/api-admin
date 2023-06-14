import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './req-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
