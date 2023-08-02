import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, ReqCategoryList } from './dto/req-category.dto';
import { UpdateCategoryDto } from './dto/res-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Helper } from 'src/common/utils/helper';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async addOrUpdate(CreateCategoryDto: CreateCategoryDto) {
    const keys = await this.redis.keys('*categories*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    return await this.categoryRepository.save(CreateCategoryDto);
  }

  async changeStatus(
    reqChangeStatusDto: ReqChangeStatusDto,
    updateBy?: string,
  ) {
    const keys = await this.redis.keys('*categories*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.categoryRepository
      .createQueryBuilder('category')
      .update()
      .set({
        status: reqChangeStatusDto.status,
      })
      .where({ id: reqChangeStatusDto.id })
      .execute();
  }
  async list(
    req,
    reqCategoryList: ReqCategoryList,
  ): Promise<PaginatedDto<Category>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Category> = {};
      if (reqCategoryList.name) {
        where.name = Like(`%${reqCategoryList.name}%`);
      }
      if (reqCategoryList.projectId) {
        where.projectId = reqCategoryList.projectId;
      }

      if (Helper.isNumeric(reqCategoryList.id)) {
        where.id = parseInt(reqCategoryList.id);
      }
      // where.status = 0;
      const result = await this.categoryRepository.findAndCount({
        where,
        order: {
          id: 'DESC',
        },
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
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  async findByName(name: string) {
    const where: FindOptionsWhere<Category> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    return await this.categoryRepository.findBy(where);
  }
  async findByLink(name: string) {
    const where: FindOptionsWhere<Category> = {};
    if (name) {
      where.linkExternal = Like(`%${name}%`);
    }
    return await this.categoryRepository.findOneBy(where);
  }
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(body: any) {
    const keys = await this.redis.keys('*categories*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.categoryRepository
      .createQueryBuilder('category')
      .softDelete()
      .where({ id: body.id, projectId: body.projectId })
      .execute();
  }
}
