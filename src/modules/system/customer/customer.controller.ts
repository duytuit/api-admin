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
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  ReqCustomerList,
  UpdateCustomerDto,
} from './dto/req-customer.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Customer } from './entities/customer.entity';
import { DataObj } from 'src/common/class/data-obj.class';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';

@Controller('system/customer')
@Public()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  async create(@Body() CreateServiceDto: CreateCustomerDto) {
    return this.customerService.addOrUpdate(CreateServiceDto);
  }
  @Post('update')
  async update(@Body() UpdateServiceDto: UpdateCustomerDto) {
    return this.customerService.addOrUpdate(UpdateServiceDto);
  }

  @Get('list')
  @ApiPaginatedResponse(Customer)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqCustomerList: ReqCustomerList,
  ) {
    return await this.customerService.list(req, ReqCustomerList);
  }

  @Post('update/status')
  updateStatus(@Body() ReqChangeStatusDto: ReqChangeStatusDto) {
    return this.customerService.changeStatus(ReqChangeStatusDto);
  }
  @Post('delete')
  remove(@Req() req, @Body() body: any) {
    return this.customerService.remove(body);
  }
}
