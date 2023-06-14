import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/req-product.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('system/products')
@Public()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.addOrUpdate(createProductDto);
  }
  @Post('update')
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productsService.addOrUpdate(updateProductDto);
  }
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
