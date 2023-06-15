import { Injectable } from '@nestjs/common';
import { ChapterDetail } from './entities/chapter_detail.entity';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateChapterDetailDto,
  ReqChapterDetailList,
} from './dto/req-chapter_detail.dto';
import { PaginatedDto } from 'src/common/dto/paginated.dto';

@Injectable()
export class ChapterDetailService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(ChapterDetail)
    private readonly chapterDetailRepository: Repository<ChapterDetail>,
  ) {}
  async addOrUpdate(CreateCategoryDto: CreateChapterDetailDto) {
    return await this.chapterDetailRepository.save(CreateCategoryDto);
  }
  async list(
    req,
    reqChapterDetailList: ReqChapterDetailList,
  ): Promise<PaginatedDto<ChapterDetail>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<ChapterDetail> = {};
      const result = await this.chapterDetailRepository.findAndCount({
        select: ['name', 'createBy', 'createTime', 'status'],
        where,
        skip: reqChapterDetailList.skip,
        take: reqChapterDetailList.take,
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
    return `This action returns a #${id} chapterDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapterDetail`;
  }
}
