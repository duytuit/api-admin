import { Injectable } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/req-product_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product_detail.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class ProductDetailsService {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
  ) {}
  async addOrUpdate(CreateProductDetailDto: CreateProductDetailDto) {
    return await this.productDetailRepository.save(CreateProductDetailDto);
  }
  async findAll() {
    const where: FindOptionsWhere<ProductDetail> = {};
    return await this.productDetailRepository.findBy(where);
  }
  async findByName(name: string) {
    const where: FindOptionsWhere<ProductDetail> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    return await this.productDetailRepository.findOneBy(where);
  }
  findOne(id: number) {
    return `This action returns a #${id} productDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} productDetail`;
  }
}
