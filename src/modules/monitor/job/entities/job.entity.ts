import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job extends BaseEntity {
  /* Id nhiệm vụ */
  @PrimaryGeneratedColumn({
    name: 'job_id',
    comment: 'Id nhiệm vụ',
  })
  @Type()
  @IsNumber()
  jobId: number;

  /* Tên nhiệm vụ */
  @Column({
    name: 'job_name',
    comment: 'Tên nhiệm vụ',
    default: '',
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
    default: 'DEFAULT',
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
    default: null,
    length: 225,
  })
  @IsString()
  @Excel({
    name: 'Gọi chuỗi đích',
  })
  invokeTarget: string;

  /* biểu thức thực thi cron */
  @Column({
    name: 'cron_expression',
    comment: 'biểu thức thực thi cron',
    default: '',
    length: 225,
  })
  @Excel({
    name: 'biểu thức thực thi cron',
  })
  @IsString()
  cronExpression: string;

  /* Lập kế hoạch thực hiện chiến lược lỗi (1 thực thi ngay lập tức 2 thực thi 3 để từ bỏ thực thi) */
  @Column({
    name: 'misfire_policy',
    comment: 'Lập kế hoạch thực hiện chiến lược lỗi (1 thực thi ngay lập tức 2 thực thi 3 để từ bỏ thực thi)',
    default: '3',
    length: 20,
  })
  @Type()
  @IsString()
  @Excel({
    name: 'Lập kế hoạch thực hiện các chiến lược lỗi',
    readConverterExp: {
      1: 'Thực thi ngay lập tức',
      2: 'Hành hình',
      3: 'Từ bỏ thực thi',
    },
  })
  misfirePolicy: string;

  /*Có nên thực thi đồng thời không (0 cho phép 1 lệnh cấm) */
  @Column({
    name: 'concurrent',
    comment: 'Có nên thực thi đồng thời không (0 cho phép 1 lệnh cấm)',
    default: '1',
    type: 'char',
    length: 1,
  })
  @Type()
  @IsString()
  concurrent: string;

  /* Trạng thái(0 bình thường 1 tạm dừng) */
  @Column({
    name: 'status',
    comment: 'Trạng thái（0 bình thường 1 tạm dừng)',
    default: '0',
    type: 'char',
    length: 1,
  })
  @IsString()
  @Excel({
    name: 'Trạng thái',
    dictType: 'sys_job_status',
  })
  status: string;
}
