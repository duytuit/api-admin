import { ApiHideProperty, OmitType } from '@nestjs/swagger';
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
import { User } from '../entities/user.entity';

/* Người dùng truy vấn Pagling */
export class ReqUserListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  phonenumber?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type()
  @IsNumber()
  deptId?: number;

  @IsOptional()
  @IsObject()
  params: ParamsDto;
}

/* Thêm người dùng */
export class ReqAddUserDto extends OmitType(User, ['userId'] as const) {
  /* ID bộ phận */
  @IsOptional()
  @Type()
  @IsNumber()
  deptId?: number;

  /* Mảng ID công việc */
  @IsArray()
  postIds: number[];

  /* Mảng ID ký tự */
  @IsArray()
  roleIds: number[];
}

/* Người dùng biên tập */
export class ReqUpdateUserDto extends OmitType(User, ['password'] as const) {
  /* ID bộ phận */
  @IsOptional()
  @Type()
  @IsNumber()
  deptId?: number;

  /* Mảng ID công việc */
  @IsArray()
  postIds: number[];

  /* Mảng ID ký tự */
  @IsArray()
  roleIds: number[];
}

/* Thay đổi mật khẩu */
export class ReqResetPwdDto {
  /* Tên người dùng */
  @IsNumber()
  userId: number;

  /* mật khẩu mới */
  @IsString()
  password: string;
}

/* Gán vai trò cho người dùng */
export class ReqUpdateAuthRoleDto {
  /* Tên người dùng */
  @Type()
  @IsNumber()
  userId: number;

  /* Mảng ID ký tự */
  @IsString()
  roleIds: string;
}

/* Biến đổi Trạng thái */
export class ReqChangeStatusDto {
  /* Tên người dùng */
  @Type()
  @IsNumber()
  userId: number;

  /* Trạng thái */
  @Type()
  @IsString()
  status: string;
}

/* Thay đổi thông tin người dùng của bạn */
export class ReqUpdataSelfDto {
  /* tên nick */
  @IsString()
  nickName?: string;

  /* SĐT */
  @IsString()
  phonenumber?: string;

  /* Email */
  @IsString()
  email?: string;

  /* Giới tính của người dùng (0 nam, 1 nữ 2 không xác định) */
  @IsOptional()
  @IsString()
  sex?: string;

  @ApiHideProperty()
  avatar: string;
}

/* Thay đổi thông tin người dùng của bạn */
export class ReqUpdateSelfPwd {
  /* Mật khẩu cũ */
  @IsString()
  oldPassword: string;

  /* Mật khẩu cũ */
  @IsString()
  newPassword: string;
}
