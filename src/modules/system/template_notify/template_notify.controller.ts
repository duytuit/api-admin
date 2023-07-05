import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemplateNotifyService } from './template_notify.service';
import { CreateTemplateNotifyDto } from './dto/create-template_notify.dto';
import { UpdateTemplateNotifyDto } from './dto/update-template_notify.dto';

@Controller('template-notify')
export class TemplateNotifyController {
  constructor(private readonly templateNotifyService: TemplateNotifyService) {}

  @Post()
  create(@Body() createTemplateNotifyDto: CreateTemplateNotifyDto) {
    return this.templateNotifyService.create(createTemplateNotifyDto);
  }

  @Get()
  findAll() {
    return this.templateNotifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateNotifyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemplateNotifyDto: UpdateTemplateNotifyDto) {
    return this.templateNotifyService.update(+id, updateTemplateNotifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateNotifyService.remove(+id);
  }
}
