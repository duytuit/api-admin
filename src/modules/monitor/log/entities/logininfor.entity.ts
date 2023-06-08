import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Logininfor {
  /* ID truy cập */
  @PrimaryGeneratedColumn({
    name: 'info_id',
    comment: 'ID truy cập',
  })
  infoId: number;

  /* tài khoản người dùng */
  @Column({
    name: 'user_name',
    comment: 'tài khoản người dùng',
    length: 50,
    default: '',
  })
  @Excel({
    name: 'tài khoản người dùng',
  })
  userName: string;

  /* Địa chỉ IP đăng nhập */
  @Column({
    name: 'ipaddr',
    comment: 'Địa chỉ IP đăng nhập',
    length: 128,
    default: '',
  })
  @Excel({
    name: 'Địa chỉ IP đăng nhập',
  })
  ipaddr: string;

  /* Đăng nhập */
  @Column({
    name: 'login_location',
    comment: 'Đăng nhập',
    length: 255,
    default: '',
  })
  @Excel({
    name: 'Đăng nhập',
  })
  loginLocation: string;

  /* Loại trình duyệt */
  @Column({
    name: 'browser',
    comment: 'Loại trình duyệt',
    length: 50,
    default: '',
  })
  @Excel({
    name: 'Loại trình duyệt',
  })
  browser: string;

  /* Loại hệ điều hành trình duyệt */
  @Column({
    name: 'os',
    comment: 'Loại hệ điều hành trình duyệt',
    length: 50,
    default: '',
  })
  @Excel({
    name: 'Loại hệ điều hành trình duyệt',
  })
  os: string;

  /* Đăng nhập trạng thái (0 thành công 1 thất bại) */
  @Column({
    name: 'status',
    comment: 'Đăng nhập Trạng thái(0 thành công 1 thất bại)',
    length: 1,
    type: 'char',
    default: '0',
  })
  @Excel({
    name: 'Đăng nhập Trạng thái',
    dictType: 'sys_common_status',
  })
  status: string;

  /* Tin nhắn nhanh chóng */
  @Column({
    name: 'msg',
    comment: 'Tin nhắn nhanh chóng',
    length: 255,
    default: '',
  })
  @Excel({
    name: 'Đăng nhập Trạng thái',
  })
  msg: string;

  /* Thời gian phỏng vấn */
  @Column({
    name: 'login_time',
    comment: 'Thời gian phỏng vấn',
    type: 'datetime',
  })
  @Excel({
    name: 'Thời gian hoạt động',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  loginTime: string;
}
