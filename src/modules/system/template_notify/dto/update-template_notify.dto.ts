import { PartialType } from '@nestjs/swagger';
import { CreateTemplateNotifyDto } from './create-template_notify.dto';

export class UpdateTemplateNotifyDto extends PartialType(CreateTemplateNotifyDto) {}
