import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto, UpdateGenreDto } from './dto/req-genre.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('system/genres')
@Public()
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post('create')
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.addOrUpdate(createGenreDto);
  }

  @Post('update')
  update(@Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.addOrUpdate(updateGenreDto);
  }
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(+id);
  }
}
