import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateTestCmDto,
  ReqTestCmList,
  UpdateTestCmDto,
} from './dto/req-test_cm.dto';
import { TestCm } from './entities/test_cm.entity';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PaginatedDto } from 'src/common/dto/paginated.dto';

@Injectable()
export class TestCmsService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(TestCm, 'db2')
    private readonly TestcCreateTestCmRepository: Repository<TestCm>,
  ) {}
  async addOrUpdate(CreateTestCmDto: CreateTestCmDto) {
    return await this.TestcCreateTestCmRepository.save(CreateTestCmDto);
  }
  async list(
    req,
    ReqTestcCreateTestCmList: ReqTestCmList,
  ): Promise<PaginatedDto<TestCm>> {
    const rs_list = await this.redis.get(req.originalUrl);
    if (!rs_list) {
      const where: FindOptionsWhere<TestCm> = {};
      // if (reqTestcCreateTestCmList.name) {
      //   where.name = Like(`%${reqTestcCreateTestCmList.name}%`);
      // }
      const result = await this.TestcCreateTestCmRepository.findAndCount({
        where,
        skip: ReqTestcCreateTestCmList.skip,
        take: ReqTestcCreateTestCmList.take,
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
  create(createTestcCreateTestCmDto: CreateTestCmDto) {
    return 'This action adds a new TestcCreateTestCm';
  }

  findAll() {
    return `This action returns all TestcCreateTestCm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} TestcCreateTestCm`;
  }

  update(id: number, UpdateTestCmDto: UpdateTestCmDto) {
    return `This action updates a #${id} TestcCreateTestCm`;
  }

  remove(id: number) {
    return `This action removes a #${id} TestcCreateTestCm`;
  }
}
