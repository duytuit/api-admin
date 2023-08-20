import { Injectable } from '@nestjs/common';
import { CreateTagDto, CreateTagsDto, ReqTagsList } from './dto/req-tag.dto';
import { UpdateTagDto } from './dto/res-tag.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Tags } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Tags, 'db2')
    private readonly TagsRepository: Repository<Tags>,
  ) {}
  async addOrUpdate(CreateTagsDto: CreateTagsDto) {
    return await this.TagsRepository.save(CreateTagsDto);
  }
  async list(
    req,
    ReqTestcCreateCategoriesList: ReqTagsList,
  ): Promise<PaginatedDto<Tags>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Tags> = {};
      const result = await this.TagsRepository.findAndCount({
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
  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
