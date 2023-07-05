import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImportHistoryService } from './import_history.service';
import { CreateImportHistoryDto } from './dto/create-import_history.dto';
import { UpdateImportHistoryDto } from './dto/update-import_history.dto';

@Controller('import-history')
export class ImportHistoryController {
  constructor(private readonly importHistoryService: ImportHistoryService) {}

  @Post()
  create(@Body() createImportHistoryDto: CreateImportHistoryDto) {
    return this.importHistoryService.create(createImportHistoryDto);
  }

  @Get()
  findAll() {
    return this.importHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportHistoryDto: UpdateImportHistoryDto) {
    return this.importHistoryService.update(+id, updateImportHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importHistoryService.remove(+id);
  }
}
