import { OmitType } from '@nestjs/swagger';
import { Genre } from '../entities/genre.entity';

export class CreateGenreDto extends OmitType(Genre, ['id'] as const) {}
export class UpdateGenreDto extends Genre {}
