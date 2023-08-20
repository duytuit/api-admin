import { OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { TestCm } from '../entities/test_cm.entity';

export class CreateTestCmDto extends OmitType(TestCm, ['id'] as const) {}
export class UpdateTestCmDto extends TestCm {}
export class ReqTestCmList extends PaginationDto {
  /* Tiêu đề quảng cáo */
  @IsOptional()
  @IsString()
  name: string;
}
