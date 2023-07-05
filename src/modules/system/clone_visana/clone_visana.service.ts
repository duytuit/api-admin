import { Injectable } from '@nestjs/common';
import { CreateCloneVisanaDto } from './dto/create-clone_visana.dto';
import { UpdateCloneVisanaDto } from './dto/update-clone_visana.dto';

@Injectable()
export class CloneVisanaService {
  create(createCloneVisanaDto: CreateCloneVisanaDto) {
    return 'This action adds a new cloneVisana';
  }

  findAll() {
    return `This action returns all cloneVisana`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cloneVisana`;
  }

  update(id: number, updateCloneVisanaDto: UpdateCloneVisanaDto) {
    return `This action updates a #${id} cloneVisana`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloneVisana`;
  }
}
