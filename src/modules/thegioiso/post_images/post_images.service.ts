import { Injectable } from '@nestjs/common';
import { CreatePostImageDto } from './dto/req-post_image.dto';
import { UpdatePostImageDto } from './dto/res-post_image.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { ReqImageList } from '../images/dto/req-image.dto';
import { Images } from '../images/entities/image.entity';
import { Post_Images } from './entities/post_image.entity';

@Injectable()
export class PostImagesService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Post_Images, 'db2')
    private readonly PostImagesRepository: Repository<Post_Images>,
  ) {}
  async addOrUpdate(CreatePostImageDto: CreatePostImageDto) {
    return await this.PostImagesRepository.save(CreatePostImageDto);
  }
  async list(
    req,
    ReqTestcCreateImagesList: ReqImageList,
  ): Promise<PaginatedDto<Post_Images>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Post_Images> = {};
      const result = await this.PostImagesRepository.findAndCount({
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
  create(createPostImageDto: CreatePostImageDto) {
    return 'This action adds a new postImage';
  }

  findAll() {
    return `This action returns all postImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postImage`;
  }

  update(id: number, updatePostImageDto: UpdatePostImageDto) {
    return `This action updates a #${id} postImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} postImage`;
  }
}
