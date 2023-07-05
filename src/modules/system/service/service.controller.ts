import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/req-service.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('system/service')
@Public()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('create')
  async create(@Body() CreateServiceDto: CreateServiceDto) {
    return this.serviceService.addOrUpdate(CreateServiceDto);
  }
  @Post('update')
  async update(@Body() UpdateServiceDto: UpdateServiceDto) {
    return this.serviceService.addOrUpdate(UpdateServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
