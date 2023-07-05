import { Injectable } from '@nestjs/common';
import { CreateCampainDto, ReqCampainList } from './dto/req-campain.dto';
import { UpdateCampainDto } from './dto/res-campain.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Campain } from './entities/campain.entity';

@Injectable()
export class CampainService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Campain)
    private readonly CampainRepository: Repository<Campain>,
  ) {}
  async addOrUpdate(CreateCampainDto: CreateCampainDto) {
    return await this.CampainRepository.save(CreateCampainDto);
  }
  async list(
    req,
    ReqCampainList: ReqCampainList,
  ): Promise<PaginatedDto<Campain>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Campain> = {};
      // if (reqCampainList.name) {
      //   where.name = Like(`%${reqCampainList.name}%`);
      // }
      const result = await this.CampainRepository.findAndCount({
        where,
        skip: ReqCampainList.skip,
        take: ReqCampainList.take,
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
  create(createCampainDto: CreateCampainDto) {
    return 'This action adds a new campain';
  }

  findAll() {
    return `This action returns all campain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campain`;
  }

  update(id: number, updateCampainDto: UpdateCampainDto) {
    return `This action updates a #${id} campain`;
  }

  remove(id: number) {
    return `This action removes a #${id} campain`;
  }
}
