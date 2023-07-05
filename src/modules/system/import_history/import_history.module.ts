import { Module } from '@nestjs/common';
import { ImportHistoryService } from './import_history.service';
import { ImportHistoryController } from './import_history.controller';

@Module({
  controllers: [ImportHistoryController],
  providers: [ImportHistoryService]
})
export class ImportHistoryModule {}
