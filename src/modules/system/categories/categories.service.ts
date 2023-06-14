import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, ReqCategoryList } from './dto/req-category.dto';
import { UpdateCategoryDto } from './dto/res-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async addOrUpdate(CreateCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(CreateCategoryDto);
  }
  async list(
    req,
    reqCategoryList: ReqCategoryList,
  ): Promise<PaginatedDto<Category>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Category> = {};
      // if (reqCategoryList.name) {
      //   where.name = Like(`%${reqCategoryList.name}%`);
      // }
      const result = await this.categoryRepository.findAndCount({
        select: ['name', 'createBy', 'createTime', 'status'],
        where,
        skip: reqCategoryList.skip,
        take: reqCategoryList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        60 * 30,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
