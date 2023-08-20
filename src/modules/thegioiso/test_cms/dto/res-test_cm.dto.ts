import { PartialType } from '@nestjs/swagger';
import { CreateTestCmDto } from './req-test_cm.dto';

export class UpdateTestCmDto extends PartialType(CreateTestCmDto) {}
