import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import * as history from 'connect-history-api-fallback';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* thiết lập HTTPĐấu thầu để giúp bảo vệ các ứng dụng khỏi một số người nổi tiếng Web Ảnh hưởng của lỗ hổng */
  app.use(
    helmet({
      contentSecurityPolicy: false, //Hủy bỏ https Chuyển đổi bắt buộc
    }),
  );

  /* Bắt đầu vue của history kiểu mẫu */
  app.use(
    history({
      rewrites: [
        {
          from: /^\/swagger-ui\/.*$/,
          to: function (context) {
            return context.parsedUrl.pathname;
          },
        },
      ],
    }),
  );

  /* Định cấu hình thư mục tài nguyên tĩnh */
  app.useStaticAssets(join(__dirname, '../public'));
  /* Định cấu hình thư mục tệp tải lên là Thư mục tài nguyên */
  if (process.env.uploadPath) {
    app.useStaticAssets(process.env.uploadPath, {
      prefix: '/upload',
    });
  }

  /* Bắt đầu swagger */
  setupSwagger(app);

  /* Khảo sát cổng khởi động */
  await app.listen(3000);

  /* In swagger Địa chỉ */
  console.log('http://127.0.0.1:3000/swagger-ui/');
}
bootstrap();
