import { Module } from '@nestjs/common';
import { VisaService } from './visa.service';
import { VisaController } from './visa.controller';
import { CategoriesModule } from 'src/modules/system/categories/categories.module';
import { ChapterDetailModule } from 'src/modules/system/chapter_detail/chapter_detail.module';
import { GenresModule } from 'src/modules/system/genres/genres.module';
import { ProductDetailsModule } from 'src/modules/system/product_details/product_details.module';
import { ProductsModule } from 'src/modules/system/products/products.module';
import { ProjectsModule } from 'src/modules/system/projects/projects.module';
import { CustomerModule } from 'src/modules/system/customer/customer.module';
import { DebitModule } from 'src/modules/system/debit/debit.module';
import { ReceiptModule } from 'src/modules/system/receipt/receipt.module';
import { BillModule } from 'src/modules/system/bill/bill.module';
import { TransactionPaymentModule } from 'src/modules/system/transaction_payment/transaction_payment.module';
import { CampainModule } from 'src/modules/system/campain/campain.module';
import { CampainDetailModule } from 'src/modules/system/campain_detail/campain_detail.module';
import { ServiceModule } from 'src/modules/system/service/service.module';
import { UploadModule } from 'src/modules/system/upload/upload.module';
import { PaymentDetailModule } from 'src/modules/system/payment_detail/payment_detail.module';
import { CurrenciesModule } from 'src/modules/system/currencies/currencies.module';
import { MailService } from 'src/modules/mail/mail.service';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    ProductDetailsModule,
    UploadModule,
    ProjectsModule,
    GenresModule,
    ChapterDetailModule,
    CustomerModule,
    DebitModule,
    ReceiptModule,
    PaymentDetailModule,
    BillModule,
    TransactionPaymentModule,
    CampainModule,
    CampainDetailModule,
    ServiceModule,
    CurrenciesModule,
  ],
  controllers: [VisaController],
  providers: [VisaService, MailService],
  exports: [VisaService],
})
export class VisaModule {}
