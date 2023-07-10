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
  Header,
  Headers,
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
import { AjaxResult, Alepay } from 'src/common/class/ajax-result.class';
import { Helper } from 'src/common/utils/helper';
import axios from 'axios';
import { MailService } from 'src/modules/mail/mail.service';
import { Bill } from 'src/modules/system/bill/entities/bill.entity';
import { Customer } from 'src/modules/system/customer/entities/customer.entity';
import { CustomerEnum } from 'src/common/enums/type.enum';
import { Product } from 'src/modules/system/products/entities/product.entity';
import { Debit } from 'src/modules/system/debit/entities/debit.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TransactionPayment } from 'src/modules/system/transaction_payment/entities/transaction_payment.entity';
import { log } from 'console';

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
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  @Post('create')
  async create(@Req() req, @Body() visa: any) {
    console.log(Helper.isJSON(visa.register));
    // console.log(JSON.parse(visa.register));
    console.log('projectId', req.query.projectId);
    // if ((int)$request->payment_alepay == 2) {  // thanh toán trả góp
    //     $data['month'] = 0;
    //     $data['allowDomestic'] = false;
    // } else {                                // thanh toán thường
    //     $data['allowDomestic'] = true;
    // }
    // validate data
    if (!Helper.isJSON(visa.register))
      return AjaxResult.error('không đúng định dạng', 401, null);
    // lưu trên redis 1 tháng

    await this.redis.rpush(
      'customer_register_visa',
      JSON.stringify(visa.register),
    );
    const register = JSON.parse(visa.register);

    // tạo hóa đơn - bill
    const alepay = new Alepay();

    if (register.customers.length > 0 && register.product) {
      const orderCode = 'VNE' + Helper.getTime();
      const customMerchantId = Helper.generateRamdomByLength(6);

      alepay.orderCode = orderCode;
      alepay.customMerchantId = customMerchantId;
      alepay.amount = 4706800;
      alepay.currency = 'VND'; // US;
      alepay.orderDescription = 'E Visa';
      alepay.totalItem = 1;
      alepay.checkoutType = 4;
      alepay.installment = false;
      alepay.cancelUrl = 'http://127.0.0.1:8091/vietnamoz/visa/callback';
      alepay.returnUrl = 'http://127.0.0.1:8091/vietnamoz/visa/callback';
      alepay.buyerName = 'nguyen duy tu';
      alepay.buyerEmail = 'duytu89@gmail.com';
      alepay.buyerPhone = '0366961008';
      alepay.buyerAddress = 'ha noi 123';
      alepay.buyerCity = 101;
      alepay.buyerCountry = 'Thái Lan';
      alepay.paymentHours = 48;
      alepay.language = 'vi';
      alepay.allowDomestic = true;
      let rs_bill = null;
      // const queryRunner = this.entityManager.queryRunner;
      try {
        // await queryRunner.startTransaction();
        for (let index = 0; index < register.customers.length; index++) {
          const item = register.customers[index];
          if (index == 0) {
            const cost =
              parseInt(register.product.price) * register.customers.length +
              (register.services
                ? Helper.sumColumnOfArray(register.services, 'price') *
                  register.customers.length
                : 0);
            const bill = new Bill();
            bill.billCode = orderCode;
            bill.cost = cost.toString();
            bill.customerAddress = item.email;
            bill.customerName = item.first_name + ' ' + item.first_name;
            bill.cycleName = parseInt(Helper.getCycleName());
            bill.email = item.email;
            bill.phone = item.phone;
            bill.projectId = parseInt(req.query.projectId);
            rs_bill = await this.BillService.addOrUpdate(bill);
            alepay.amount =
              register.currency == 'VND'
                ? cost
                : Math.round(cost / parseInt(register.exchange_rate));
            alepay.currency = register.currency == 'VND' ? 'VND' : 'USD';
            alepay.buyerName = item.first_name + ' ' + item.first_name;
            alepay.buyerEmail = item.email;
            alepay.buyerPhone = item.phone;
            alepay.buyerAddress = item.national;
            alepay.buyerCountry = item.national;
            alepay.language = register.currency == 'VND' ? 'vi' : 'en';
          }
          // thêm khách hàng và chi tieert hóa đơn
          const customer = new Customer();
          customer.avatar = item.avatar;
          customer.countryId = item.country_id;
          customer.email = item.email;
          customer.first_name = item.first_name;
          customer.full_name = item.first_name + ' ' + item.last_name;
          customer.identityCardImage = item.identity_card_image;
          customer.last_name = item.last_name;
          customer.nationalId = parseInt(item.national_id);
          customer.passportImage = item.passport_image;
          customer.passportNo = item.passport_no;
          customer.phone = item.phone;
          customer.profession = item.profession;
          customer.projectId = parseInt(req.query.projectId);
          customer.type = CustomerEnum.visa;
          await this.CustomerService.addOrUpdate(customer);
          const debit = new Debit();
          debit.billId = rs_bill.id;
          debit.cycleName = parseInt(Helper.getCycleName());
          debit.desc_detail = item.first_name + ' ' + item.last_name;
          debit.name = register.product.name;
          debit.productId = register.product.id;
          debit.projectId = parseInt(req.query.projectId);
          debit.quantity = 1;
          // debit.serviceId =  ;
          debit.sumery = register.product.price;
          await this.DebitService.addOrUpdate(debit);
          register.services.forEach(async (item_1, index_1) => {
            const debit = new Debit();
            debit.billId = rs_bill.id;
            debit.cycleName = parseInt(Helper.getCycleName());
            debit.desc_detail = item.first_name + ' ' + item.last_name;
            debit.name = item_1.name;
            debit.projectId = parseInt(req.query.projectId);
            debit.quantity = 1;
            debit.serviceId = item_1.id;
            debit.sumery = item_1.price;
            await this.DebitService.addOrUpdate(debit);
          });
        }
        // await queryRunner.commitTransaction();
      } catch (error) {
        console.log('+++++++++++++++++++++++++++++');
        await this.redis.rpush(
          'customer_register_visa_error',
          JSON.stringify(error),
        );
        // await queryRunner.rollbackTransaction();
        throw error;
      }
      const rs_alepay = await this.sendOrder(alepay);
      await this.redis.rpush(
        'customer_register_visa_rs_alepay',
        JSON.stringify(rs_alepay),
      );
      console.log(alepay);
      const transactionPayment = new TransactionPayment();
      transactionPayment.billId = rs_bill.id;
      transactionPayment.code = rs_alepay.code;
      transactionPayment.messager = rs_alepay.message;
      transactionPayment.transactionCode = rs_alepay.transactionCode;
      transactionPayment.paid = rs_bill.cost;
      transactionPayment.projectId = parseInt(req.query.projectId);
      await this.TransactionPaymentService.addOrUpdate(transactionPayment);
      return rs_alepay;
    } else {
      return AjaxResult.error('không có dữ liệu đăng ký', 401, null);
    }

    //return await this.sendOrder(alepay);
    // return await this.sendEmail();
    // console.log(abc);
    // return {
    //   abc: 'dsfdsfds',
    // };

    // const data = Helper.convertObjToParam(alepay);
    // console.log(data);
    // return res.redirect('http://127.0.0.1:3000/transaction/result');
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
  @Get('callback')
  async callback(@Headers('Accept') Headers: string, @Req() req) {
    await this.redis.rpush('customer_register_visa_callback', req.query);
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
    data.returnUrl = 'http://127.0.0.1:8091/vietnamoz/visa/callback';
    const signature = Helper.makeSignature(data, checksumKey);
    console.log(signature);
    data.signature = signature;
    const rs = await axios.post(
      'https://alepay-v3-sandbox.nganluong.vn/api/v3/checkout/request-payment',
      data,
    );
    return rs.data;
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
