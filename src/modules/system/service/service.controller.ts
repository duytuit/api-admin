import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import {
  CreateServiceDto,
  ReqServiceList,
  UpdateServiceDto,
} from './dto/req-service.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { DataObj } from 'src/common/class/data-obj.class';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { Service } from './entities/service.entity';

@Controller('system/service')
@Public()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('create')
  async create(@Body() CreateServiceDto: CreateServiceDto) {
    return this.serviceService.addOrUpdate(CreateServiceDto);
  }
  @Post('update')
  async update(@Body() UpdateServiceDto: UpdateServiceDto) {
    return this.serviceService.addOrUpdate(UpdateServiceDto);
  }

  @Get('list')
  @ApiPaginatedResponse(Service)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqServiceList: ReqServiceList,
  ) {
    const rs_list = await this.serviceService.list(req, ReqServiceList);
    return DataObj.create(rs_list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
