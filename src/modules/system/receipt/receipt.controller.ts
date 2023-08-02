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
import { ReceiptService } from './receipt.service';
import {
  CreateReceiptDto,
  ReqReceiptList,
  UpdateReceiptDto,
} from './dto/req-receipt.dto';
import { Receipt } from './entities/receipt.entity';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';

@Controller('system/receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post('create')
  async create(@Body() CreateServiceDto: CreateReceiptDto) {
    return this.receiptService.addOrUpdate(CreateServiceDto);
  }
  @Post('update')
  async update(@Body() UpdateServiceDto: UpdateReceiptDto) {
    return this.receiptService.addOrUpdate(UpdateServiceDto);
  }

  @Get('list')
  @ApiPaginatedResponse(Receipt)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqReceiptList: ReqReceiptList,
  ) {
    return await this.receiptService.list(req, ReqReceiptList);
  }

  @Post('update/status')
  updateStatus(@Body() ReqChangeStatusDto: ReqChangeStatusDto) {
    return this.receiptService.changeStatus(ReqChangeStatusDto);
  }
  @Post('delete')
  remove(@Req() req, @Body() body: any) {
    return this.receiptService.remove(body);
  }
}
