import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TestCmsService } from './test_cms.service';
import { TestCmsController } from './test_cms.controller';
import { TestCm } from './entities/test_cm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestCm], 'db2')],
  controllers: [TestCmsController],
  providers: [TestCmsService],
  exports: [TestCmsService],
})
export class TestCmsModule {}
