import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/req-customer.dto';
import { Public } from 'src/common/decorators/public.decorator';

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

  @Get()
  findAll() {
    return this.customerService.findAll();
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
