import { Module } from '@nestjs/common';
import { TokenDeviceService } from './token_device.service';
import { TokenDeviceController } from './token_device.controller';

@Module({
  controllers: [TokenDeviceController],
  providers: [TokenDeviceService]
})
export class TokenDeviceModule {}
