import { Module } from '@nestjs/common';
import { TemplateNotifyService } from './template_notify.service';
import { TemplateNotifyController } from './template_notify.controller';

@Module({
  controllers: [TemplateNotifyController],
  providers: [TemplateNotifyService]
})
export class TemplateNotifyModule {}
