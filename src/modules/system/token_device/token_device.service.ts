import { Injectable } from '@nestjs/common';
import { CreateTokenDeviceDto } from './dto/create-token_device.dto';
import { UpdateTokenDeviceDto } from './dto/update-token_device.dto';

@Injectable()
export class TokenDeviceService {
  create(createTokenDeviceDto: CreateTokenDeviceDto) {
    return 'This action adds a new tokenDevice';
  }

  findAll() {
    return `This action returns all tokenDevice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tokenDevice`;
  }

  update(id: number, updateTokenDeviceDto: UpdateTokenDeviceDto) {
    return `This action updates a #${id} tokenDevice`;
  }

  remove(id: number) {
    return `This action removes a #${id} tokenDevice`;
  }
}
