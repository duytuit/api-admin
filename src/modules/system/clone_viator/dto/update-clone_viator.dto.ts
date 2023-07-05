import { PartialType } from '@nestjs/swagger';
import { CreateCloneViatorDto } from './create-clone_viator.dto';

export class UpdateCloneViatorDto extends PartialType(CreateCloneViatorDto) {}
