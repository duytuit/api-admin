import { PartialType } from '@nestjs/swagger';
import { CreateCloneVisanaDto } from './create-clone_visana.dto';

export class UpdateCloneVisanaDto extends PartialType(CreateCloneVisanaDto) {}
