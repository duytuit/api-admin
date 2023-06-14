import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/req-product_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
  ) {}
  async addOrUpdate(CreateProductDetailDto: CreateProductDetailDto) {
    return await this.productDetailRepository.save(CreateProductDetailDto);
  }

  findAll() {
    return `This action returns all productDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} productDetail`;
  }
}
