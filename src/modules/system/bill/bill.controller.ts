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
import { BillService } from './bill.service';
import { CreateBillDto, ReqBillList, UpdateBillDto } from './dto/req-bill.dto';
import { Bill } from './entities/bill.entity';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';

@Controller('system/bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('create')
  async create(@Body() CreateServiceDto: CreateBillDto) {
    return this.billService.addOrUpdate(CreateServiceDto);
  }
  @Post('update')
  async update(@Body() UpdateServiceDto: UpdateBillDto) {
    return this.billService.addOrUpdate(UpdateServiceDto);
  }

  @Get('list')
  @ApiPaginatedResponse(Bill)
  async findAll(@Req() req, @Query(PaginationPipe) ReqBillList: ReqBillList) {
    return await this.billService.list(req, ReqBillList);
  }

  @Post('update/status')
  updateStatus(@Body() ReqChangeStatusDto: ReqChangeStatusDto) {
    return this.billService.changeStatus(ReqChangeStatusDto);
  }
  @Post('delete')
  remove(@Req() req, @Body() body: any) {
    return this.billService.remove(body);
  }
}
