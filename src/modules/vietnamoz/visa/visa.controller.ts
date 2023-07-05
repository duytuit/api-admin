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
import { VisaService } from './visa.service';
import { CreateVisaDto } from './dto/create-visa.dto';
import { UpdateVisaDto } from './dto/update-visa.dto';
import { ServiceService } from 'src/modules/system/service/service.service';
import { CustomerService } from 'src/modules/system/customer/customer.service';
import { BillService } from 'src/modules/system/bill/bill.service';
import { ReceiptService } from 'src/modules/system/receipt/receipt.service';
import { DebitService } from 'src/modules/system/debit/debit.service';
import { PaymentDetailService } from 'src/modules/system/payment_detail/payment_detail.service';
import { TransactionPaymentService } from 'src/modules/system/transaction_payment/transaction_payment.service';
import { CampainService } from 'src/modules/system/campain/campain.service';
import { CampainDetailService } from 'src/modules/system/campain_detail/campain_detail.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { CategoriesService } from 'src/modules/system/categories/categories.service';
import { ChapterDetailService } from 'src/modules/system/chapter_detail/chapter_detail.service';
import { GenresService } from 'src/modules/system/genres/genres.service';
import { ProductDetailsService } from 'src/modules/system/product_details/product_details.service';
import { ProductsService } from 'src/modules/system/products/products.service';
import { ProjectsService } from 'src/modules/system/projects/projects.service';
import { UploadService } from 'src/modules/system/upload/upload.service';
import { Public } from 'src/common/decorators/public.decorator';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { DataObj } from 'src/common/class/data-obj.class';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { ReqProductList } from 'src/modules/system/products/dto/req-product.dto';
import { ReqServiceList } from 'src/modules/system/service/dto/req-service.dto';
import { ReqCurrencyList } from 'src/modules/system/currencies/dto/req-currency.dto';
import { CurrenciesService } from 'src/modules/system/currencies/currencies.service';
import { AjaxResult } from 'src/common/class/ajax-result.class';

@Controller('vietnamoz/visa')
@Public()
export class VisaController {
  constructor(
    private readonly visaService: VisaService,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly genresService: GenresService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly projectsService: ProjectsService,
    private readonly uploadService: UploadService,
    private readonly chapterDetailService: ChapterDetailService,
    private readonly ServiceService: ServiceService,
    private readonly CustomerService: CustomerService,
    private readonly BillService: BillService,
    private readonly ReceiptService: ReceiptService,
    private readonly DebitService: DebitService,
    private readonly PaymentDetailService: PaymentDetailService,
    private readonly TransactionPaymentService: TransactionPaymentService,
    private readonly CampainService: CampainService,
    private readonly CampainDetailService: CampainDetailService,
    private readonly CurrenciesService: CurrenciesService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  @Post()
  create(@Body() createVisaDto: CreateVisaDto) {
    return this.visaService.create(createVisaDto);
  }
  @Get('list')
  async findAll(
    @Req() req,
    @Query(PaginationPipe) ReqProductList: ReqProductList,
    @Query(PaginationPipe) ReqServiceList: ReqServiceList,
    @Query(PaginationPipe) ReqCurrencyList: ReqCurrencyList,
  ) {
    const rs_list = [];
    const rs_product = await this.productsService.list(req, ReqProductList);
    const rs_service = await this.ServiceService.list(req, ReqServiceList);
    const rs_currencies = await this.CurrenciesService.list(
      req,
      ReqCurrencyList,
    );
    // console.log(process.env.TIME_EXPIRE_REDIS || 60);

    return {
      data: {
        product: rs_product,
        service: rs_service,
        currencies: rs_currencies,
      },
    };
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisaDto: UpdateVisaDto) {
    return this.visaService.update(+id, updateVisaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visaService.remove(+id);
  }
}
