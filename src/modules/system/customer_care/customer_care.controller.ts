import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerCareService } from './customer_care.service';
import { CreateCustomerCareDto } from './dto/create-customer_care.dto';
import { UpdateCustomerCareDto } from './dto/update-customer_care.dto';

@Controller('customer-care')
export class CustomerCareController {
  constructor(private readonly customerCareService: CustomerCareService) {}

  @Post()
  create(@Body() createCustomerCareDto: CreateCustomerCareDto) {
    return this.customerCareService.create(createCustomerCareDto);
  }

  @Get()
  findAll() {
    return this.customerCareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerCareService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerCareDto: UpdateCustomerCareDto) {
    return this.customerCareService.update(+id, updateCustomerCareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerCareService.remove(+id);
  }
}
