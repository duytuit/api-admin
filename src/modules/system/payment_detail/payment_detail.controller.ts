import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentDetailService } from './payment_detail.service';
import {
  CreatePaymentDetailDto,
  UpdatePaymentDetailDto,
} from './dto/req-payment_detail.dto';

@Controller('payment-detail')
export class PaymentDetailController {
  constructor(private readonly paymentDetailService: PaymentDetailService) {}

  @Post()
  create(@Body() createPaymentDetailDto: CreatePaymentDetailDto) {
    return this.paymentDetailService.create(createPaymentDetailDto);
  }

  @Get()
  findAll() {
    return this.paymentDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDetailDto: UpdatePaymentDetailDto,
  ) {
    return this.paymentDetailService.update(+id, updatePaymentDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentDetailService.remove(+id);
  }
}
