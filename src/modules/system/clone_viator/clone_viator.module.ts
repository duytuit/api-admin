import { Module } from '@nestjs/common';
import { CloneViatorService } from './clone_viator.service';
import { CloneViatorController } from './clone_viator.controller';
import { CategoriesModule } from '../categories/categories.module';
import { ChapterDetailModule } from '../chapter_detail/chapter_detail.module';
import { GenresModule } from '../genres/genres.module';
import { ProductDetailsModule } from '../product_details/product_details.module';
import { ProductsModule } from '../products/products.module';
import { ProjectsModule } from '../projects/projects.module';
import { UploadModule } from '../upload/upload.module';

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
  controllers: [CloneViatorController],
  providers: [CloneViatorService],
})
export class CloneViatorModule {}
