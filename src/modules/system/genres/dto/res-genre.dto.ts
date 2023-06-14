import { PartialType } from '@nestjs/swagger';
import { CreateGenreDto } from './req-genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
