import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oper_log',
})
export class OperLog {
  /* Nhật ký khóa chính */
  @PrimaryGeneratedColumn({
    name: 'oper_id',
    comment: 'Nhật ký khóa chính',
  })
  operId: number;

  /* Tiêu đề Mô-đun */
  @Column({
    name: 'title',
    comment: 'Tiêu đề Mô-đun',
    length: 50,
    default: '',
  })
  @Excel({
    name: 'Tiêu đề Mô-đun',
  })
  title: string;

  /* 'Loại hình kinh doanh */
  @Column({
    name: 'business_type',
    comment: 'Loại hình kinh doanh',
    default: '0',
    type: 'char',
    length: 1,
  })
  @Excel({
    name: 'Loại hình kinh doanh',
    dictType: 'sys_oper_type',
  })
  businessType: string;

  /* Tên phương thức */
  @Column({
    name: 'method',
    comment: 'Tên phương thức',
    length: 100,
    default: '',
  })
  @Excel({
    name: 'Tên phương thức',
  })
  method: string;

  /* Cách yêu cầu */
  @Column({
    name: 'request_method',
    comment: 'Cách yêu cầu',
    length: 10,
    default: '',
  })
  @Excel({
    name: 'Cách yêu cầu',
  })
  requestMethod: string;

  /* Thể loại hoạt động (0 người dùng nền 1 khác 2 Người dùng thiết bị đầu cuối điện thoại di động) */
  @Column({
    name: 'operator_type',
    comment: 'Thể loại hoạt động (0 người dùng nền 1 khác 2 Người dùng thiết bị đầu cuối điện thoại di động)',
    default: '0',
    type: 'char',
    length: 1,
  })
  operatorType: string;

  /* nhà điều hành */
  @Column({
    name: 'oper_name',
    comment: 'nhà điều hành',
    length: 50,
    default: '',
  })
  @Excel({
    name: 'nhà điều hành',
  })
  operName: string;

  /* Tên bộ phận */
  @Column({
    name: 'dept_name',
    comment: 'Tên bộ phận',
    length: 50,
    default: '',
  })
  deptName: string;

  /* Yêu cầu url */
  @Column({
    name: 'oper_url',
    comment: 'Yêu cầu url',
    length: 255,
    default: '',
  })
  @Excel({
    name: 'Yêu cầu url',
  })
  operUrl: string;

  /* Địa chỉ máy chủ */
  @Column({
    name: 'oper_ip',
    comment: 'Địa chỉ máy chủ',
    length: 128,
    default: '',
  })
  @Excel({
    name: 'Địa chỉ máy chủ',
  })
  operIp: string;

  /* Nơi */
  @Column({
    name: 'oper_location',
    comment: 'Nơi',
    length: 255,
    default: '',
  })
  @Excel({
    name: 'Nơi',
  })
  operLocation: string;

  /* Tham số yêu cầu */
  @Column({
    name: 'oper_param',
    comment: 'Tham số yêu cầu',
    length: 2000,
    default: '',
  })
  operParam: string;

  /* Trả về tham số */
  @Column({
    name: 'json_result',
    comment: 'Trả về tham số',
    length: 2000,
    default: '',
  })
  jsonResult: string;

  /* Hoạt động trgng thái (0 bình thường 1 bất thường) */
  @Column({
    name: 'status',
    comment: 'Hoạt động trgng thái (0 bình thường 1 bất thường)',
    default: 0,
    type: 'int',
  })
  @Excel({
    name: 'Thao tác trạng thái',
    dictType: 'sys_common_status',
  })
  status: number;

  /* Trả về tham số */
  @Column({
    name: 'errorMsg',
    comment: 'Trả về tham số',
    length: 2000,
    default: '',
  })
  errorMsg: string;

  /* Thời gian hoạt động */
  @Column({
    name: 'oper_time',
    comment: 'Thời gian hoạt động',
    type: 'datetime',
  })
  @Excel({
    name: 'Thời gian hoạt động',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  operTime: string;
}
