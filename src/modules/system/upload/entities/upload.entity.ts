import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Upload extends BaseEntity {
  /* upload ID */
  @PrimaryGeneratedColumn({
    name: 'upload_id',
    comment: 'upload ID',
  })
  @Type()
  @IsNumber()
  uploadId: number;

  /* Tên file */
  @Column({
    name: 'file_name',
    comment: 'Tên tệp',
    length: 500,
  })
  @IsString()
  fileName: string;
  /* Tệp gốc */
  @Column({
    name: 'file_original_name',
    comment: 'Tên tệp gốc',
    length: 500,
  })
  @IsString()
  fileOriginalName: string;

  /* Link tệp */
  @Column({
    name: 'external_link',
    comment: 'Link tệp',
    length: 500,
  })
  @IsString()
  externalLink: string;

  /* Định dạng tệp */
  @Column({
    name: 'extension',
    comment: 'định dạng tệp',
    length: 10,
  })
  @IsString()
  extension: string;

  /* Kích thước tệp */
  @IsNumber()
  @Type(() => Number)
  @Column({
    name: 'file_size',
    comment: 'Kích thước tệp',
    default: 0,
  })
  fileSize: number;
  /* Kiểu tệp */
  @Column({
    name: 'type',
    comment: 'Kiểu tệp',
    length: 20,
    default: null,
  })
  @IsString()
  type: string;

  /* Hiển thị thứ tự */
  @Column({
    name: 'sort',
    comment: 'Hiển thị thứ tự',
  })
  @IsNumber()
  @Type(() => Number)
  sort: number;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  projectId: number | null;

  @Column({
    name: 'status',
    comment: 'Thông báo trang thái (0 bình thường 1 đóng) ',
    type: 'char',
    default: '0',
    length: 1,
  })
  status: string;
}
