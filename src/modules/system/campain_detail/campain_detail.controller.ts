import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampainDetailService } from './campain_detail.service';
import {
  CreateCampainDetailDto,
  UpdateCampainDetailDto,
} from './dto/req-campain_detail.dto';

@Controller('campain-detail')
export class CampainDetailController {
  constructor(private readonly campainDetailService: CampainDetailService) {}

  @Post()
  create(@Body() createCampainDetailDto: CreateCampainDetailDto) {
    return this.campainDetailService.create(createCampainDetailDto);
  }

  @Get()
  findAll() {
    return this.campainDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campainDetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampainDetailDto: UpdateCampainDetailDto,
  ) {
    return this.campainDetailService.update(+id, updateCampainDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campainDetailService.remove(+id);
  }
}
