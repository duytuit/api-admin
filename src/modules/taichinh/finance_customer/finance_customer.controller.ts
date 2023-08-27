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
import { FinanceCustomerService } from './finance_customer.service';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { FinanceCustomer } from './entities/finance_customer.entity';
import { ReqChangeStatusDto } from 'src/common/dto/params.dto';
import {
  CreateFinanceCustomerDto,
  ReqFinanceCustomerList,
  UpdateFinanceCustomerDto,
} from './dto/req-finance_customer.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Helper } from 'src/common/utils/helper';
import { LogDebug } from 'src/common/debugLog';

@Controller('system/finance-customer')
@Public()
export class FinanceCustomerController {
  constructor(
    private readonly FinanceCustomerService: FinanceCustomerService,
  ) {}

  @Post('create')
  async create(@Body() CreateServiceDto: CreateFinanceCustomerDto) {
    CreateServiceDto.billCode = ('VN' + Helper.getTime()).toString();
    CreateServiceDto.cycleName = parseInt(Helper.getCycleName());
    LogDebug._khachdangkyvay(CreateServiceDto);
    return this.FinanceCustomerService.addOrUpdate(CreateServiceDto);
  }
  @Post('update')
  async update(@Body() UpdateServiceDto: UpdateFinanceCustomerDto) {
    return this.FinanceCustomerService.addOrUpdate(UpdateServiceDto);
  }

  @Get('list')
  @ApiPaginatedResponse(FinanceCustomer)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqFinanceCustomerList: ReqFinanceCustomerList,
  ) {
    return await this.FinanceCustomerService.list(req, ReqFinanceCustomerList);
  }

  @Post('update/status')
  updateStatus(@Body() ReqChangeStatusDto: ReqChangeStatusDto) {
    return this.FinanceCustomerService.changeStatus(ReqChangeStatusDto);
  }
  @Post('delete')
  remove(@Req() req, @Body() body: any) {
    return this.FinanceCustomerService.remove(body);
  }
}
