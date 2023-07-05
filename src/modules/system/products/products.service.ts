import { Injectable } from '@nestjs/common';
import { CreateProductDto, ReqProductList } from './dto/req-product.dto';
import { Product } from './entities/product.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRedis()
    private readonly redis: Redis,
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
  async list(
    req,
    reqProductList: ReqProductList,
  ): Promise<PaginatedDto<Product>> {
    const rs_list = await this.redis.get('product' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Product> = {};
      // if (reqProductList.name) {
      //   where.name = Like(`%${reqProductList.name}%`);
      // }
      if (reqProductList.projectId) {
        where.projectId = reqProductList.projectId;
      }
      if (reqProductList.categoryId) {
        where.categoryId = reqProductList.categoryId;
      }
      const result = await this.productRepository.findAndCount({
        where,
        skip: reqProductList.skip,
        take: reqProductList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        'product' + req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
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
