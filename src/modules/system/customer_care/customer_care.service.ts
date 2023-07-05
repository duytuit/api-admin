import { Injectable } from '@nestjs/common';
import { CreateCustomerCareDto } from './dto/create-customer_care.dto';
import { UpdateCustomerCareDto } from './dto/update-customer_care.dto';

@Injectable()
export class CustomerCareService {
  create(createCustomerCareDto: CreateCustomerCareDto) {
    return 'This action adds a new customerCare';
  }

  findAll() {
    return `This action returns all customerCare`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerCare`;
  }

  update(id: number, updateCustomerCareDto: UpdateCustomerCareDto) {
    return `This action updates a #${id} customerCare`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerCare`;
  }
}
