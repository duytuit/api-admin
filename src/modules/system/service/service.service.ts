import { Injectable } from '@nestjs/common';
import { CreateServiceDto, ReqServiceList } from './dto/req-service.dto';
import { UpdateServiceDto } from './dto/res-service.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(Service)
    private readonly ServiceRepository: Repository<Service>,
  ) {}
  async addOrUpdate(CreateServiceDto: CreateServiceDto) {
    return await this.ServiceRepository.save(CreateServiceDto);
  }
  async list(
    req,
    ReqServiceList: ReqServiceList,
  ): Promise<PaginatedDto<Service>> {
    const rs_list = await this.redis.get('service' + req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<Service> = {};
      // if (reqServiceList.name) {
      //   where.name = Like(`%${reqServiceList.name}%`);
      // }
      if (ReqServiceList.projectId) {
        where.projectId = ReqServiceList.projectId;
      }
      const result = await this.ServiceRepository.findAndCount({
        where,
        skip: ReqServiceList.skip,
        take: ReqServiceList.take,
      });
      const rs_list = {
        rows: result[0],
        total: result[1],
      };
      await this.redis.set(
        'service' + req.originalUrl,
        JSON.stringify(rs_list),
        'EX',
        process.env.TIME_EXPIRE_REDIS || 60,
      );
      return rs_list;
    }
    return rs_list ? JSON.parse(rs_list) : null;
  }
  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  findAll() {
    return `This action returns all service`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
