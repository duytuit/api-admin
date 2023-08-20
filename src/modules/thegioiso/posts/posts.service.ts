import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/req-post.dto';
import { UpdatePostDto } from './dto/res-post.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { ReqImageList } from '../images/dto/req-image.dto';
import { Posts } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Posts, 'db2')
    private readonly PostsRepository: Repository<Posts>,
  ) {}
  async addOrUpdate(CreatePostDto: CreatePostDto) {
    return await this.PostsRepository.save(CreatePostDto);
  }
  async list(
    req,
    ReqTestcCreateImagesList: ReqImageList,
  ): Promise<PaginatedDto<Posts>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Posts> = {};
      const result = await this.PostsRepository.findAndCount({
        where,
        skip: ReqTestcCreateImagesList.skip,
        take: ReqTestcCreateImagesList.take,
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
  async findByLink(link: string) {
    const where: FindOptionsWhere<Posts> = {};
    where.link_external = link;
    return await this.PostsRepository.findOneBy(where);
  }
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
