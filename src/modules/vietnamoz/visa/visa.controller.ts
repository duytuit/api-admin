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
  Res,
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
import { Helper } from 'src/common/utils/helper';
import axios from 'axios';
import { MailService } from 'src/modules/mail/mail.service';

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
    private readonly mailService: MailService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  @Post('create')
  async create(@Req() req, @Body() visa: any) {
    // console.log(JSON.parse(visa.register));
    // console.log(req);
    // if ((int)$request->payment_alepay == 2) {  // thanh toán trả góp
    //     $data['month'] = 0;
    //     $data['allowDomestic'] = false;
    // } else {                                // thanh toán thường
    //     $data['allowDomestic'] = true;
    // }
    const alepay = {
      orderCode: Helper.generateRamdomByLength(5),
      customMerchantId: Helper.generateRamdomByLength(6),
      amount: 4706800,
      currency: 'VND',
      orderDescription: 'E Visa',
      totalItem: 1,
      checkoutType: 4,
      installment: false,
      cancelUrl: 'http://127.0.0.1:8000/transaction/result',
      returnUrl: 'http://127.0.0.1:8000/transaction/result',
      buyerName: 'nguyen duy tu',
      buyerEmail: 'duytu89@gmail.com',
      buyerPhone: '0366961008',
      buyerAddress: 'ha noi',
      buyerCity: 101,
      buyerCountry: 'Việt Nam',
      paymentHours: 48,
      language: 'vi',
      allowDomestic: true,
    };
    return await this.sendOrder(alepay);
    // return await this.sendEmail();
    // console.log(abc);
    // return {
    //   abc: 'dsfdsfds',
    // };

    // const data = Helper.convertObjToParam(alepay);
    // console.log(data);
    // return res.redirect('http://127.0.0.1:8000/transaction/result');
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
      product: rs_product,
      service: rs_service,
      currencies: rs_currencies,
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
  private async sendOrder(data) {
    //   $data['tokenKey'] = config('aleypay.sandbox.apiKey');
    //   $checksumKey = config('aleypay.sandbox.checksumKey');
    //   $data['returnUrl'] = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") ? "https" : "http"). "://". @$_SERVER['HTTP_HOST'].config('aleypay.sandbox.callbackUrl');
    //   $signature =  AlepayUtils::makeSignature_v2($data, $checksumKey);
    //   $data['signature'] = $signature;
    //   $data_string = json_encode($data);
    //  $url = config('aleypay.sandbox.domain').'/request-payment';
    //   $ch = curl_init($url);
    //   curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    //   curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    //   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    //   curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    //       'Content-Type: application/json',
    //       'Content-Length: ' . strlen($data_string)
    //   ));
    //   $result = curl_exec($ch);
    //   return json_decode($result);
    //   'live' =>[
    //     'domain' => 'https://alepay-v3.nganluong.vn/api/v3/checkout',
    //     "apiKey" => "mz7yS4yVognq5UsUlbJq8vWXc9KwEB", //Là key dùng để xác định tài khoản nào đang được sử dụng.
    //     "encryptKey" => "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCn1EvZaQ4+BjvXZsqV4PFJcCLXp1He3wSyzbZ3dufD+oXmDzE1e4XinyEeWUEK9CJh2zpxqGJKJMAKWxozqNgy6CwnUE0amiauTgqglsCkLGb1s8671zOiCQqwF8IS9rLzIlJe59Juu/Sbw3F/lLB5cYuYwQoimXGIL9D4ppvD6wIDAQAB", //Là key dùng để mã hóa dữ liệu truyền tới Alepay.
    //     "checksumKey" => "s7UlvRCqTieXyA9UXoo2R9IJQ4W62p", //Là key dùng để tạo checksum data.
    //     "callbackUrl" => '/transaction/result',
    // ],
    // 'sandbox' =>[
    //     'domain' => 'https://alepay-v3-sandbox.nganluong.vn/api/v3/checkout',
    //     "apiKey" => "La4vzOQVGlVZUL2jp46ETpDDsHNeE9", //Là key dùng để xác định tài khoản nào đang được sử dụng.
    //     "encryptKey" => "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCn1EvZaQ4+BjvXZsqV4PFJcCLXp1He3wSyzbZ3dufD+oXmDzE1e4XinyEeWUEK9CJh2zpxqGJKJMAKWxozqNgy6CwnUE0amiauTgqglsCkLGb1s8671zOiCQqwF8IS9rLzIlJe59Juu/Sbw3F/lLB5cYuYwQoimXGIL9D4ppvD6wIDAQAB", //Là key dùng để mã hóa dữ liệu truyền tới Alepay.
    //     "checksumKey" => "HzxR9TCpMseGm1GUSNq873XGi156cP", //Là key dùng để tạo checksum data.
    //     "callbackUrl" => '/transaction/result',
    // ]
    const checksumKey = 'HzxR9TCpMseGm1GUSNq873XGi156cP';
    data.tokenKey = 'La4vzOQVGlVZUL2jp46ETpDDsHNeE9';
    data.returnUrl = 'http://127.0.0.1:8000/transaction/result';
    const signature = Helper.makeSignature(data, checksumKey);
    console.log(signature);
    data.signature = signature;
    const dsfdsf = await axios.post(
      'https://alepay-v3-sandbox.nganluong.vn/api/v3/checkout/request-payment',
      data,
    );
    console.log(dsfdsf.data);

    // return await axios({
    //   method: 'post',
    //   url: 'https://alepay-v3-sandbox.nganluong.vn/api/v3/checkout/request-payment',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Content-Length': data_string.length.toString(),
    //   },
    //   data: data,
    // });
  }
  private async sendEmail() {
    const to = 'duytu89@gmail.com';
    const subject = 'Thông báo mới từ visa';
    const text = 'xin chào';

    return await this.mailService.sendEmail(to, subject, text);
  }
  private async sendEmailApi() {
    const to = 'duytu89@gmail.com';
    const subject = 'Test Email';
    const text = 'This is a test email sent using Mailgun and NestJS.';

    return await this.mailService.sendEmailApi(to, subject, text);
  }
}
