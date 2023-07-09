import { SysConfigModule } from './modules/system/sys-config/sys-config.module';
import { CommonModule } from './modules/common/common.module';
import { LoginModule } from './modules/login/login.module';
import { SharedModule } from './shared/shared.module';
import { ExistingProvider, Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/system/auth/auth.module';
import { UserModule } from './modules/system/user/user.module';
import { DictModule } from './modules/system/dict/dict.module';
import { NoticeModule } from './modules/system/notice/notice.module';
import { PostModule } from './modules/system/post/post.module';
import { DeptModule } from './modules/system/dept/dept.module';
import { MenuModule } from './modules/system/menu/menu.module';
import { RoleModule } from './modules/system/role/role.module';
import { LogModule } from './modules/monitor/log/log.module';
import { OnlineModule } from './modules/monitor/online/online.module';
import { JobModule } from './modules/monitor/job/job.module';
import { ServerModule } from './modules/monitor/server/server.module';
import { JobService } from './modules/monitor/job/job.service';
import { DevModule } from './modules/system/dev/dev.module';
import { UploadModule } from './modules/system/upload/upload.module';
import { ProjectsModule } from './modules/system/projects/projects.module';
import { CategoriesModule } from './modules/system/categories/categories.module';
import { ProductsModule } from './modules/system/products/products.module';
import { ProductDetailsModule } from './modules/system/product_details/product_details.module';
import { BlogsModule } from './modules/system/blogs/blogs.module';
import { VisaModule } from './modules/vietnamoz/visa/visa.module';
import { PaymentsModule } from './modules/system/payments/payments.module';
import { GenresModule } from './modules/system/genres/genres.module';
import { ChapterDetailModule } from './modules/system/chapter_detail/chapter_detail.module';
import { CloneVisanaModule } from './modules/system/clone_visana/clone_visana.module';
import { ServiceModule } from './modules/system/service/service.module';
import { CustomerModule } from './modules/system/customer/customer.module';
import { BillModule } from './modules/system/bill/bill.module';
import { ReceiptModule } from './modules/system/receipt/receipt.module';
import { TransactionPaymentModule } from './modules/system/transaction_payment/transaction_payment.module';
import { BankModule } from './modules/system/bank/bank.module';
import { PartnerModule } from './modules/system/partner/partner.module';
import { PriceModule } from './modules/system/price/price.module';
import { DebitModule } from './modules/system/debit/debit.module';
import { PaymentDetailModule } from './modules/system/payment_detail/payment_detail.module';
import { PromotionModule } from './modules/system/promotion/promotion.module';
import { PromotionDetailModule } from './modules/system/promotion_detail/promotion_detail.module';
import { TemplateNotifyModule } from './modules/system/template_notify/template_notify.module';
import { TokenDeviceModule } from './modules/system/token_device/token_device.module';
import { RequestModule } from './modules/system/request/request.module';
import { CommentModule } from './modules/system/comment/comment.module';
import { ImportHistoryModule } from './modules/system/import_history/import_history.module';
import { CampainModule } from './modules/system/campain/campain.module';
import { CampainDetailModule } from './modules/system/campain_detail/campain_detail.module';
import { EmployeeModule } from './modules/system/employee/employee.module';
import { CustomerCareModule } from './modules/system/customer_care/customer_care.module';
import { WarehouseModule } from './modules/system/warehouse/warehouse.module';
import { CloneViatorModule } from './modules/system/clone_viator/clone_viator.module';
import { CurrenciesModule } from './modules/system/currencies/currencies.module';
import { MailService } from './modules/mail/mail.service';

/* Sẽ provider Tên lớp，Thuận tiện để gọi hẹn giờ gọi*/
const providers = [JobService];
function createAliasProviders(): ExistingProvider[] {
  const aliasProviders: ExistingProvider[] = [];
  for (const p of providers) {
    aliasProviders.push({
      provide: p.name,
      useExisting: p,
    });
  }
  return aliasProviders;
}
const aliasProviders = createAliasProviders();

@Module({
  imports: [
    /* Mô -đun tệp cấu hình */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    /* Mô -đun công khai */
    SharedModule,

    /* Mô -đun kinh doanh */
    CommonModule,
    LoginModule,
    AuthModule,
    UserModule,
    DictModule,
    SysConfigModule,
    NoticeModule,
    PostModule,
    DeptModule,
    MenuModule,
    RoleModule,
    LogModule,
    OnlineModule,
    JobModule,
    ServerModule,
    DevModule,
    UploadModule,
    ProjectsModule,
    CategoriesModule,
    ProductsModule,
    ProductDetailsModule,
    BlogsModule,
    VisaModule,
    PaymentsModule,
    GenresModule,
    ChapterDetailModule,
    CloneVisanaModule,
    ServiceModule,
    CustomerModule,
    BillModule,
    ReceiptModule,
    TransactionPaymentModule,
    BankModule,
    PartnerModule,
    PriceModule,
    DebitModule,
    PaymentDetailModule,
    PromotionModule,
    PromotionDetailModule,
    TemplateNotifyModule,
    TokenDeviceModule,
    RequestModule,
    CommentModule,
    ImportHistoryModule,
    CampainModule,
    CampainDetailModule,
    EmployeeModule,
    CustomerCareModule,
    WarehouseModule,
    CloneViatorModule,
    CurrenciesModule,
  ],
  providers: [...aliasProviders, MailService],
})
export class AppModule {}
