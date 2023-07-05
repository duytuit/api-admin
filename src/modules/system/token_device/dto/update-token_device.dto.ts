import { PartialType } from '@nestjs/swagger';
import { CreateTokenDeviceDto } from './create-token_device.dto';

export class UpdateTokenDeviceDto extends PartialType(CreateTokenDeviceDto) {}
