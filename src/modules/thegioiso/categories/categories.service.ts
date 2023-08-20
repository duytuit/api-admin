import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, ReqCategoryList } from './dto/req-category.dto';
import { UpdateCategoryDto } from './dto/res-category.dto';
import { Categories } from './entities/category.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Categories, 'db2')
    private readonly CategoriesRepository: Repository<Categories>,
  ) {}
  async addOrUpdate(CreateCategoryDto: CreateCategoryDto) {
    return await this.CategoriesRepository.save(CreateCategoryDto);
  }
  async list(
    req,
    ReqTestcCreateCategoriesList: ReqCategoryList,
  ): Promise<PaginatedDto<Categories>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Categories> = {};
      const result = await this.CategoriesRepository.findAndCount({
        where,
        skip: ReqTestcCreateCategoriesList.skip,
        take: ReqTestcCreateCategoriesList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all categories`;
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
