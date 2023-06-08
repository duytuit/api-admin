import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Menu } from '../entities/menu.entity';

export class ReqMenuListDto {
  /* Tên menu */
  @IsOptional()
  @IsString()
  menuName?: string;

  /* Trạng thái */
  @IsOptional()
  @IsString()
  status?: string;
}

export class ReqAddMenuDto extends OmitType(Menu, ['menuId'] as const) {
  /* ID bộ phận cha mẹ */
  @Type()
  @IsNumber()
  parentId: number;
}

export class ReqUpdateMenu extends Menu {
  /* ID bộ phận cha mẹ */
  @Type()
  @IsNumber()
  parentId: number;
}
