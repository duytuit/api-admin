import { Injectable } from '@nestjs/common';
import { CreateImageDto, ReqImageList } from './dto/req-image.dto';
import { UpdateImageDto } from './dto/res-image.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Images } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Images, 'db2')
    private readonly ImagesRepository: Repository<Images>,
  ) {}
  async addOrUpdate(CreateImageDto: CreateImageDto) {
    return await this.ImagesRepository.save(CreateImageDto);
  }
  async list(
    req,
    ReqTestcCreateImagesList: ReqImageList,
  ): Promise<PaginatedDto<Images>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Images> = {};
      const result = await this.ImagesRepository.findAndCount({
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
    const where: FindOptionsWhere<Images> = {};
    where.link_external = link;
    return await this.ImagesRepository.findOneBy(where);
  }
  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
