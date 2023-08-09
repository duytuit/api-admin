import { Injectable } from '@nestjs/common';
import { CreateTagDto, ReqTagGroupTag, ReqTagList } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';
import { Helper } from 'src/common/utils/helper';
import { PaginatedDto } from 'src/common/dto/paginated.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Tag)
    private readonly TagRepository: Repository<Tag>,
  ) {}
  async addOrUpdate(CreateTagDto: CreateTagDto) {
    const keys = await this.redis.keys('*tag*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    return await this.TagRepository.save(CreateTagDto);
  }
  async findByTag(tag: string) {
    const where: FindOptionsWhere<Tag> = {};
    if (tag) {
      where.tag = Like(`%${tag}%`);
    }
    return await this.TagRepository.findOneBy(where);
  }
  async list(req, ReqTagList: ReqTagList): Promise<PaginatedDto<Tag>> {
    const rs_list = await this.redis.get('tag' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Tag> = {};
      // if (reqTagList.name) {
      //   where.name = Like(`%${reqTagList.name}%`);
      // }
      if (ReqTagList.projectId) {
        where.projectId = ReqTagList.projectId;
      }
      if (ReqTagList.postId) {
        where.postId = ReqTagList.postId;
      }
      if (Helper.isNumeric(ReqTagList.id)) {
        where.id = parseInt(ReqTagList.id);
      }
      const result = await this.TagRepository.findAndCount({
        where,
        skip: ReqTagList.skip,
        take: ReqTagList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        'tag' + req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  async changeStatus(
    ReqChangeStatusDto: ReqChangeStatusDto,
    updateBy?: string,
  ) {
    const keys = await this.redis.keys('*tag*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.TagRepository.createQueryBuilder('tag')
      .update()
      .set({
        status: ReqChangeStatusDto.status,
      })
      .where({ id: ReqChangeStatusDto.id })
      .execute();
  }
  async remove(body: any) {
    const keys = await this.redis.keys('*tag*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.TagRepository.createQueryBuilder('tag')
      .softDelete()
      .where({ id: body.id, projectId: body.projectId })
      .execute();
  }
  async getTagGroupTag(req, ReqTagGroupTag: ReqTagGroupTag) {
    const rs_list = await this.redis.get('tag' + req.originalUrl);
    if (!rs_list) {
      const result = await this.TagRepository.createQueryBuilder('tag')
        .softDelete()
        .select('COUNT(tag.tag) as count,tag.tag')
        .groupBy('tag.tag')
        .where({
          type: ReqTagGroupTag.type,
          projectId: ReqTagGroupTag.projectId,
        })
        .execute();
      console.log(result);
      const rs_list = {
        rows: result,
      };
      await this.redis.set(
        'tag' + req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
}
