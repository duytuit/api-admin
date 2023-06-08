import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'job_log',
})
export class JobLog {
  /* ID nhật ký nhiệm vụ */
  @PrimaryGeneratedColumn({
    name: 'job_log_id',
    comment: 'ID nhật ký nhiệm vụ',
  })
  @Type()
  @IsNumber()
  jobLogId: number;

  /* Tên nhiệm vụ */
  @Column({
    name: 'job_name',
    comment: 'Tên nhiệm vụ',
    length: 64,
  })
  @IsString()
  @Excel({
    name: 'Tên nhiệm vụ',
  })
  jobName: string;

  /* Tên nhóm nhiệm vụ */
  @Column({
    name: 'job_group',
    comment: 'Tên nhóm nhiệm vụ',
    length: 64,
  })
  @IsString()
  @Excel({
    name: 'Tên nhóm nhiệm vụ',
    dictType: 'sys_job_group',
  })
  jobGroup: string;

  /* Gọi chuỗi đích */
  @Column({
    name: 'invoke_target',
    comment: 'Gọi chuỗi đích',
    length: 500,
  })
  @IsString()
  @Excel({
    name: 'Gọi chuỗi đích',
  })
  invokeTarget: string;

  /* Thông tin đăng nhập */
  @Column({
    name: 'job_message',
    comment: 'Thông tin đăng nhập',
    length: 500,
    default: null,
  })
  @IsString()
  @Excel({
    name: 'Thông tin đăng nhập',
  })
  jobMessage: string;

  /* Thực hiện trgng thái (0 thất bại 1 bình thường) */
  @Column({
    name: 'status',
    comment: 'Thực hiện trang thái (0 bình thường 1 thất bại)',
    default: '0',
    type: 'char',
    length: 1,
  })
  @IsString()
  @Excel({
    name: 'thực hiện trạng thái',
    dictType: 'sys_common_status',
  })
  status: string;

  /* Thông tin bất thường */
  @Column({
    name: 'exception_info',
    comment: 'Thông tin bất thường',
    length: 2000,
    default: '',
  })
  @IsString()
  @Excel({
    name: 'Thông tin bất thường',
  })
  exceptionInfo: string;

  @CreateDateColumn({ name: 'create_time', comment: 'Thời gian' })
  @Excel({
    name: 'Thời gian',
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
  })
  createTime: Date | string;
}
