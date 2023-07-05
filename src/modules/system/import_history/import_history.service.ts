import { Injectable } from '@nestjs/common';
import { CreateImportHistoryDto } from './dto/create-import_history.dto';
import { UpdateImportHistoryDto } from './dto/update-import_history.dto';

@Injectable()
export class ImportHistoryService {
  create(createImportHistoryDto: CreateImportHistoryDto) {
    return 'This action adds a new importHistory';
  }

  findAll() {
    return `This action returns all importHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importHistory`;
  }

  update(id: number, updateImportHistoryDto: UpdateImportHistoryDto) {
    return `This action updates a #${id} importHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} importHistory`;
  }
}
