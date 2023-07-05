import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampainService } from './campain.service';
import { CreateCampainDto, UpdateCampainDto } from './dto/req-campain.dto';

@Controller('campain')
export class CampainController {
  constructor(private readonly campainService: CampainService) {}

  @Post()
  create(@Body() createCampainDto: CreateCampainDto) {
    return this.campainService.create(createCampainDto);
  }

  @Get()
  findAll() {
    return this.campainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampainDto: UpdateCampainDto) {
    return this.campainService.update(+id, updateCampainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campainService.remove(+id);
  }
}
