import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './req-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
