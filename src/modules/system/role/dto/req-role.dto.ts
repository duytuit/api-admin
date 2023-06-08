import { OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { Role } from '../../role/entities/role.entity';

/* Nhân vật */
export class ReqAddRoleDto extends OmitType(Role, ['roleId'] as const) {
  /* Id menu mảng */
  @IsArray()
  menuIds: number[];
}

/* Biên tập viên */
export class ReqUpdateRoleDto extends ReqAddRoleDto {
  @Type()
  @IsNumber()
  roleId: number;
}

/* Chỉ định quyền dữ liệu */
export class ReqDataScopeDto extends Role {
  /* Mảng ID của bộ phận */
  @IsArray()
  deptIds: number[];
}

/* Truy vấn phân trang */
export class ReqRoleListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  roleName?: string;

  @IsOptional()
  @IsString()
  roleKey?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  params: ParamsDto;
}

/* Thay đổi vai trò Trạng thái */
export class ReqChangeStatusDto {
  /* ID ký tự */
  @Type()
  @IsNumber()
  roleId: number;

  /* Trạng thái giá trị */
  @Type()
  @IsString()
  status: string;
}

export class ReqAllocatedListDto extends PaginationDto {
  /* ID ký tự */
  @Type()
  @IsNumber()
  roleId: number;

  /* tên tài khoản */
  @IsOptional()
  @IsString()
  userName?: string;

  /* số điện thoại */
  @IsOptional()
  @IsString()
  phonenumber?: string;
}

/* Một sự hủy bỏ duy nhất về vai trò của người dùng */
export class ReqCancelDto {
  /* ID ký tự */
  @Type()
  @IsNumber()
  roleId: number;

  /* Tên người dùng */
  @Type()
  @IsNumber()
  userId: number;
}

/* Batch hủy/ủy quyền Vai trò người dùng Ủy quyền */
export class ReqCancelAllDto {
  /* ID ký tự */
  @Type()
  @IsNumber()
  roleId: number;

  /* Chuỗi nhân vật người dùng khâu như 1,2,3 */
  @Type()
  @IsString()
  userIds: string;
}
