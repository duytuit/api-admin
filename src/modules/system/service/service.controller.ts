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
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';

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
    return await this.serviceService.list(req, ReqServiceList);
  }

  @Post('update/status')
  updateStatus(@Body() ReqChangeStatusDto: ReqChangeStatusDto) {
    return this.serviceService.changeStatus(ReqChangeStatusDto);
  }
  @Post('delete')
  remove(@Req() req, @Body() body: any) {
    // console.log(body);
    return this.serviceService.remove(body);
  }
}
