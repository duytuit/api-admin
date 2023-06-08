import { User } from 'src/modules/system/user/entities/user.entity';

export class ResImageCaptchaDto {
  /* base64 Mã hóa hình ảnh */
  img: string;

  /* Mã UUID */
  uuid: string;
}

export class ResLoginDto {
  /* Mã thông báo */
  token: string;
}

export class ResInfo {
  /* Quyền */
  permissions: string[];

  /* Nhận dạng ký tự */
  roles: string[];

  /* thông tin người dùng */
  user: User;
}
