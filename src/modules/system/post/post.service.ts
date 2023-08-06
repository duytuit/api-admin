/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { ReqAddPostDto, ReqPostListDto } from './dto/req-post.dto';
import { Post } from './entities/post.entity';
import {
  ReqChangeSlugDto,
  ReqChangeStatusDto,
} from 'src/common/dto/params.dto';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Helper } from 'src/common/utils/helper';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  /* Yêu cầu thông qua mã hóa công việc */
  async findByPostCode(postCode: string) {
    return await this.postRepository.findOneBy({ postCode });
  }

  /* Thêm hoặc biên tập viên */
  async addOrUpdate(reqAddPostDto: ReqAddPostDto) {
    const keys = await this.redis.keys('*post*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    reqAddPostDto.slug = Helper.convertToSlug(
      Helper.toLowerCaseNonAccentVietnamese(reqAddPostDto.slug),
    );
    await this.postRepository.save(reqAddPostDto);
  }

  /* Truy vấn phân trang */
  async list(reqPostListDto: ReqPostListDto): Promise<PaginatedDto<Post>> {
    const where: FindOptionsWhere<Post> = {};
    if (reqPostListDto.postCode) {
      where.postCode = Like(`%${reqPostListDto.postCode}%`);
    }
    if (reqPostListDto.postName) {
      where.postName = Like(`%${reqPostListDto.postName}%`);
    }
    if (reqPostListDto.status) {
      where.status = reqPostListDto.status;
    }
    const result = await this.postRepository.findAndCount({
      select: [
        'id',
        'postCode',
        'postName',
        'createTime',
        'postSort',
        'status',
        'createBy',
        'remark',
      ],
      where,
      order: {
        postSort: 1,
        createTime: 1,
      },
      skip: reqPostListDto.skip,
      take: reqPostListDto.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* Tìm thông qua ID */
  async findById(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  /* Thông qua mảng id xoá */
  async delete(postIdArr: number[] | string[]) {
    return await this.postRepository.delete(postIdArr);
  }

  /* vượt qua id Mảng truy vấn tất cả dữ liệu đáp ứng */
  async listByIdArr(idArr: number[]) {
    return this.postRepository.find({
      where: {
        id: In(idArr),
      },
    });
  }
  async addOrUpdate_v2(ReqAddPostDto: ReqAddPostDto) {
    const keys = await this.redis.keys('*post*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    return await this.postRepository.save(ReqAddPostDto);
  }
  async changeStatus(
    reqChangeStatusDto: ReqChangeStatusDto,
    updateBy?: string,
  ) {
    const keys = await this.redis.keys('*post*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.postRepository
      .createQueryBuilder('post')
      .update()
      .set({
        status: reqChangeStatusDto.status,
      })
      .where({ id: reqChangeStatusDto.id })
      .execute();
  }

  async changeSlug(ReqChangeSlugDto: ReqChangeSlugDto, updateBy?: string) {
    const keys = await this.redis.keys('*post*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.postRepository
      .createQueryBuilder('post')
      .update()
      .set({
        slug: Helper.convertToSlug(
          Helper.toLowerCaseNonAccentVietnamese(ReqChangeSlugDto.slug),
        ),
      })
      .where({ id: ReqChangeSlugDto.id })
      .execute();
  }

  async list_v2(
    req,
    ReqPostListDto: ReqPostListDto,
  ): Promise<PaginatedDto<Post>> {
    const rs_list = await this.redis.get('post' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Post> = {};
      if (ReqPostListDto.name) {
        where.name = Like(`%${ReqPostListDto.name}%`);
      }
      if (ReqPostListDto.projectId) {
        where.projectId = ReqPostListDto.projectId;
      }
      if (ReqPostListDto.categoryId) {
        where.categoryId = ReqPostListDto.categoryId;
      }

      const result = await this.postRepository.findAndCount({
        where,
        order: {
          id: 'DESC',
        },
        skip: ReqPostListDto.skip,
        take: ReqPostListDto.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        'post' + req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  async remove(body: any) {
    const keys = await this.redis.keys('*post*');
    if (keys.length > 0) {
      await this.redis.del(keys);
    }
    await this.postRepository
      .createQueryBuilder('post')
      .softDelete()
      .where({ id: body.id, projectId: body.projectId })
      .execute();
  }
}
