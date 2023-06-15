import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductDetailsModule } from '../product_details/product_details.module';
import { UploadModule } from '../upload/upload.module';
import { ProjectsModule } from '../projects/projects.module';
import { GenresModule } from '../genres/genres.module';
import { ChapterDetailModule } from '../chapter_detail/chapter_detail.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    ProductDetailsModule,
    UploadModule,
    ProjectsModule,
    GenresModule,
    ChapterDetailModule,
  ],
  controllers: [DevController],
  providers: [DevService],
})
export class DevModule {}
