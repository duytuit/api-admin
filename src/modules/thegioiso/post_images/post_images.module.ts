import { Module } from '@nestjs/common';
import { PostImagesService } from './post_images.service';
import { PostImagesController } from './post_images.controller';
import { Post_Images } from './entities/post_image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Post_Images], 'db2')],
  controllers: [PostImagesController],
  providers: [PostImagesService],
  exports: [PostImagesService],
})
export class PostImagesModule {}
