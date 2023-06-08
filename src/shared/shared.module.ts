/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 16:44:29
 * @LastEditTime: 2022-10-03 23:52:10
 * @LastEditors: Please set LastEditors
 * @Description: Mô -đun công khai
 * @FilePath: /meimei-admin/src/shared/shared.module.ts
 * You can you up，no can no bb！！
 */
import { SharedService } from './shared.service';
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ReponseTransformInterceptor } from 'src/common/interceptors/reponse-transform.interceptor';
import { OperationLogInterceptor } from 'src/common/interceptors/operation-log.interceptor';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PermissionAuthGuard } from 'src/common/guards/permission-auth.guard';
import { RoleAuthGuard } from 'src/common/guards/role-auth.guard';
import { LogModule } from 'src/modules/monitor/log/log.module';
import { BullModule } from '@nestjs/bull';
import { DataScopeInterceptor } from 'src/common/interceptors/data-scope.interceptor';
import { RepeatSubmitGuard } from 'src/common/guards/repeat-submit.guard';
import { DemoEnvironmentGuard } from 'src/common/guards/demo-environment.guard';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Global()
@Module({
  imports: [
    /* liên kết mysql cơ sở dữ liệu */
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        autoLoadModels: configService.get<boolean>('database.autoLoadModels'),
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: configService.get('database.logging'),
      }),
      inject: [ConfigService],
    }),

    /* liên kết redis */
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get<any>('redis'),
      inject: [ConfigService],
    }),

    /* Bật hàng đợi */
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('bullRedis.host'),
          port: configService.get<number>('bullRedis.port'),
          password: configService.get<string>('bullRedis.password'),
        },
      }),
      inject: [ConfigService],
    }),

    /* Nhập Excel Mô -đun giới hạn tỷ lệ   ttl:Đơn vị thứ hai, Nó có nghĩa là bạn chỉ có thể yêu cầu tối đa các giây TTL limit Hạng hai, Tránh các cuộc tấn công bạo lực.*/
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),

    /* Nhập Excel Mô -đun nhật ký hệ thống */
    LogModule,
  ],
  controllers: [],
  providers: [
    SharedService,

    //Bộ lọc bất thường toàn cầu
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },

    //Đường ống xác minh tham số toàn cầu
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // Bật danh sách màu trắng, DTO Không có khai báo trong thuộc tính tự động lọc
        transform: true, // Chuyển đổi loại tự động
      }),
    },

    //Bảo vệ hạn chế tốc độ
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    //jwt bảo vệ
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    // Bảo vệ nhân vật
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },

    // Bảo vệ chính quyền
    {
      provide: APP_GUARD,
      useClass: PermissionAuthGuard,
    },
    //Ngăn chặn sự phục tùng liên tục
    {
      provide: APP_GUARD,
      useClass: RepeatSubmitGuard,
    },
    //Có thể hiện bảo vệ môi trường
    {
      provide: APP_GUARD,
      useClass: DemoEnvironmentGuard,
    },

    /* Hoạt động Log Interceptor.Lưu ý: Trong bộ đánh chặn handle Thực hiện từ dưới lên trên（ReponseTransformInterceptor ----> OperationLogInterceptor）, Trả về giá trị của giá trị theo thứ tự */
    {
      provide: APP_INTERCEPTOR,
      useClass: OperationLogInterceptor,
    },
    /* Trở lại toàn cầu về giá trị đánh chặn chuyển đổi */
    {
      provide: APP_INTERCEPTOR,
      useClass: ReponseTransformInterceptor,
    },
    /* Quyền dữ liệu đánh chặn */
    {
      provide: APP_INTERCEPTOR,
      useClass: DataScopeInterceptor,
    },
  ],
  exports: [SharedService],
})
export class SharedModule {}
