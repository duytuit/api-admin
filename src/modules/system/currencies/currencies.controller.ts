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
import { CurrenciesService } from './currencies.service';
import {
  CreateCurrencyDto,
  ReqCurrencyList,
  UpdateCurrencyDto,
} from './dto/req-currency.dto';
import { Currency } from './entities/currency.entity';
import { DataObj } from 'src/common/class/data-obj.class';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('system/currencies')
@Public()
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post('create')
  async create(@Body() CreateCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.addOrUpdate(CreateCurrencyDto);
  }
  @Post('update')
  async update(@Body() UpdateCurrencyDto: UpdateCurrencyDto) {
    return this.currenciesService.addOrUpdate(UpdateCurrencyDto);
  }

  @Get('list')
  @ApiPaginatedResponse(Currency)
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqCurrencyList: ReqCurrencyList,
  ) {
    const rs_list = await this.currenciesService.list(req, ReqCurrencyList);
    return DataObj.create(rs_list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currenciesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(+id);
  }
}
