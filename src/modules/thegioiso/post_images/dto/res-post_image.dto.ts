import { PartialType } from '@nestjs/swagger';
import { CreatePostImageDto } from './req-post_image.dto';

export class UpdatePostImageDto extends PartialType(CreatePostImageDto) {}
