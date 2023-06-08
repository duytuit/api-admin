import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { DevService } from './dev.service';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { DataObj } from 'src/common/class/data-obj.class';

@Controller('system/dev')
@Public()
export class DevController {
  constructor(private readonly devService: DevService) {}

  @Post()
  create(@Body() createDevDto: CreateDevDto) {
    return this.devService.create(createDevDto);
  }

  @Get('list')
  findAll() {
    console.log('sfdsfds');
    return DataObj.create("dsfsdfdsfds") ;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDevDto: UpdateDevDto) {
    return this.devService.update(+id, updateDevDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devService.remove(+id);
  }
}
