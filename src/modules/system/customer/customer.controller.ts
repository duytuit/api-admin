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

@Controller('system/customer')
@Public()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  async create(@Body() CreateCustomerDto: CreateCustomerDto) {
    return this.customerService.addOrUpdate(CreateCustomerDto);
  }
  @Post('update')
  async update(@Body() UpdateCustomerDto: UpdateCustomerDto) {
    return this.customerService.addOrUpdate(UpdateCustomerDto);
  }

  @Get('list')
  @ApiPaginatedResponse(Customer)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqCustomerList: ReqCustomerList,
  ) {
    const rs_list = await this.customerService.list(req, ReqCustomerList);
    return DataObj.create(rs_list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
