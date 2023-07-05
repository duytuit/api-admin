import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenDeviceService } from './token_device.service';
import { CreateTokenDeviceDto } from './dto/create-token_device.dto';
import { UpdateTokenDeviceDto } from './dto/update-token_device.dto';

@Controller('token-device')
export class TokenDeviceController {
  constructor(private readonly tokenDeviceService: TokenDeviceService) {}

  @Post()
  create(@Body() createTokenDeviceDto: CreateTokenDeviceDto) {
    return this.tokenDeviceService.create(createTokenDeviceDto);
  }

  @Get()
  findAll() {
    return this.tokenDeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenDeviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenDeviceDto: UpdateTokenDeviceDto) {
    return this.tokenDeviceService.update(+id, updateTokenDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenDeviceService.remove(+id);
  }
}
