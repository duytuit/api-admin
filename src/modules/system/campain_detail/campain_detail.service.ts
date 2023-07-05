import { Injectable } from '@nestjs/common';
import {
  CreateCampainDetailDto,
  ReqCampainDetailList,
} from './dto/req-campain_detail.dto';
import { UpdateCampainDetailDto } from './dto/res-campain_detail.dto';
import { CampainDetail } from './entities/campain_detail.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';

@Injectable()
export class CampainDetailService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(CampainDetail)
    private readonly CampainDetailRepository: Repository<CampainDetail>,
  ) {}
  async addOrUpdate(CreateCampainDetailDto: CreateCampainDetailDto) {
    return await this.CampainDetailRepository.save(CreateCampainDetailDto);
  }
  async list(
    req,
    ReqCampainDetailList: ReqCampainDetailList,
  ): Promise<PaginatedDto<CampainDetail>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<CampainDetail> = {};
      // if (reqCampainDetailList.name) {
      //   where.name = Like(`%${reqCampainDetailList.name}%`);
      // }
      const result = await this.CampainDetailRepository.findAndCount({
        where,
        skip: ReqCampainDetailList.skip,
        take: ReqCampainDetailList.take,
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
  create(createCampainDetailDto: CreateCampainDetailDto) {
    return 'This action adds a new campainDetail';
  }

  findAll() {
    return `This action returns all campainDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campainDetail`;
  }

  update(id: number, updateCampainDetailDto: UpdateCampainDetailDto) {
    return `This action updates a #${id} campainDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} campainDetail`;
  }
}
