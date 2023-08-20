import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostImagesService } from './post_images.service';
import { CreatePostImageDto } from './dto/req-post_image.dto';
import { UpdatePostImageDto } from './dto/res-post_image.dto';

@Controller('post-images')
export class PostImagesController {
  constructor(private readonly postImagesService: PostImagesService) {}

  @Post()
  create(@Body() createPostImageDto: CreatePostImageDto) {
    return this.postImagesService.create(createPostImageDto);
  }

  @Get()
  findAll() {
    return this.postImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostImageDto: UpdatePostImageDto) {
    return this.postImagesService.update(+id, updatePostImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postImagesService.remove(+id);
  }
}
