import { Injectable } from '@nestjs/common';
import { CreateTemplateNotifyDto } from './dto/create-template_notify.dto';
import { UpdateTemplateNotifyDto } from './dto/update-template_notify.dto';

@Injectable()
export class TemplateNotifyService {
  create(createTemplateNotifyDto: CreateTemplateNotifyDto) {
    return 'This action adds a new templateNotify';
  }

  findAll() {
    return `This action returns all templateNotify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} templateNotify`;
  }

  update(id: number, updateTemplateNotifyDto: UpdateTemplateNotifyDto) {
    return `This action updates a #${id} templateNotify`;
  }

  remove(id: number) {
    return `This action removes a #${id} templateNotify`;
  }
}
