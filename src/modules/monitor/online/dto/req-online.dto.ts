import { IsOptional, IsString } from 'class-validator';
/* Truy vấn người dùng trực tuyến */
export class ReqOnline {
  /* Địa chỉ đăng nhập */
  @IsOptional()
  @IsString()
  ipaddr?: string;

  /* tên tài khoản */
  @IsOptional()
  @IsString()
  userName?: string;
}
