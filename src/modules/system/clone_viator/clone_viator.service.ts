import { Injectable } from '@nestjs/common';
import { CreateCloneViatorDto } from './dto/create-clone_viator.dto';
import { UpdateCloneViatorDto } from './dto/update-clone_viator.dto';

@Injectable()
export class CloneViatorService {
  create(createCloneViatorDto: CreateCloneViatorDto) {
    return 'This action adds a new cloneViator';
  }

  findAll() {
    return `This action returns all cloneViator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cloneViator`;
  }

  update(id: number, updateCloneViatorDto: UpdateCloneViatorDto) {
    return `This action updates a #${id} cloneViator`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloneViator`;
  }
}
