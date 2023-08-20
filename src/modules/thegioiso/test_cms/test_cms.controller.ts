import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { TestCmsService } from './test_cms.service';
import { CreateTestCmDto, ReqTestCmList } from './dto/req-test_cm.dto';
import { UpdateTestCmDto } from './dto/res-test_cm.dto';
import { TestCm } from './entities/test_cm.entity';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('thegioiso/test-cms')
@Public()
export class TestCmsController {
  constructor(private readonly testCmsService: TestCmsService) {}
  @Get('list')
  @ApiPaginatedResponse(TestCm)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqProductList: ReqTestCmList,
  ) {
    return await this.testCmsService.list(req, ReqProductList);
  }
  @Post()
  create(@Body() createTestCmDto: CreateTestCmDto) {
    return this.testCmsService.create(createTestCmDto);
  }
}
