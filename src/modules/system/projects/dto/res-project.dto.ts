import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './req-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
