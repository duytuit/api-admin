import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/req-product.dto';
import { Product } from './entities/product.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async addOrUpdate(CreateProductDto: CreateProductDto) {
    return await this.productRepository.save(CreateProductDto);
  }
  async findByLink(name: string) {
    const where: FindOptionsWhere<Product> = {};
    if (name) {
      where.linkExternal = Like(`%${name}%`);
    }
    return await this.productRepository.findBy(where);
  }
  async findAll() {
    const where: FindOptionsWhere<Product> = {};
    return await this.productRepository.findBy(where);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
