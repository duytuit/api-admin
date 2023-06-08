/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { ReqAddPostDto, ReqPostListDto } from './dto/req-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  /* Yêu cầu thông qua mã hóa công việc */
  async findByPostCode(postCode: string) {
    return await this.postRepository.findOneBy({ postCode });
  }

  /* Thêm hoặc biên tập viên */
  async addOrUpdate(reqAddPostDto: ReqAddPostDto) {
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
        'postId',
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
  async findById(postId: number) {
    return await this.postRepository.findOneBy({ postId });
  }

  /* Thông qua mảng id xoá */
  async delete(postIdArr: number[] | string[]) {
    return await this.postRepository.delete(postIdArr);
  }

  /* vượt qua id Mảng truy vấn tất cả dữ liệu đáp ứng */
  async listByIdArr(idArr: number[]) {
    return this.postRepository.find({
      where: {
        postId: In(idArr),
      },
    });
  }
}
