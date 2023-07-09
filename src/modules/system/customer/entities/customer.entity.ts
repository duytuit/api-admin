import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Double, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* Name */
  @Column({
    name: 'full_name',
    comment: 'Tên Khách hàng',
    length: 500,
  })
  @IsString()
  full_name: string;

  /* First Name */
  @Column({
    name: 'first_name',
    comment: 'Tên đầu tiên',
    length: 50,
  })
  @IsString()
  first_name: string;

  /* Last Name */
  @Column({
    name: 'last_name',
    comment: 'Tên cuối',
    length: 50,
  })
  @IsString()
  last_name: string;

  /* Số điện thoại */
  @Column({
    name: 'phone',
    comment: 'phone',
    length: 20,
    default: null,
  })
  @Type()
  @IsString()
  @IsOptional()
  phone: string;

  /* email */
  @Column({
    name: 'email',
    comment: 'email',
    length: 100,
    default: null,
  })
  @Type()
  @IsString()
  @IsOptional()
  email: string;

  /* Nationality */
  @Column({
    name: 'national_id',
    comment: 'Quốc tịch',
    default: null,
    type: 'tinyint',
  })
  @IsOptional()
  nationalId: number;

  /* country_id */
  @Column({
    name: 'country_id',
    comment: 'Quốc gia',
    default: null,
    type: 'tinyint',
  })
  @IsOptional()
  countryId: number;

  /* passport_no */
  @Column({
    name: 'passport_no',
    comment: 'Hộ chiếu',
    default: null,
    length: 100,
  })
  @IsOptional()
  passportNo: string;

  /* identity_card image */
  @Column({
    name: 'identity_card_image',
    comment: 'Ảnh Chứng minh',
    default: null,
  })
  @IsOptional()
  identityCardImage: string;

  /* profession */
  @Column({
    name: 'profession',
    comment: 'nghề nghiệp',
    default: null,
    length: 100,
  })
  @IsOptional()
  @IsString()
  profession: string;

  /* avatar */
  @Column({
    name: 'avatar',
    comment: 'ảnh đại diện',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  avatar: string;

  /* passport_image */
  @Column({
    name: 'passport_image',
    comment: 'ảnh hộ chiếu',
    length: 500,
    default: null,
  })
  @IsString()
  @IsOptional()
  passportImage: string;

  /* National ID */
  @Column({
    name: 'identity_card',
    comment: 'chứng minh thư',
    length: 100,
    default: null,
  })
  @IsString()
  @IsOptional()
  identityCard: string;

  /* Type */
  @Column({
    name: 'type',
    comment: 'mục đích tạo khách hàng',
    default: 0,
  })
  @IsNumber()
  type: number;

  /* Desc detail */
  @Column({
    name: 'desc_detail',
    comment: 'nội dung mô tả mục đích tạo khách hàng',
    default: null,
    type: 'longtext',
  })
  @IsString()
  @IsOptional()
  descDetail: string;

  /* Project Id */
  @Column({
    name: 'project_id',
    comment: 'Id dự án',
    default: null,
  })
  @IsNumber()
  @Type()
  projectId: number;

  @Column({
    name: 'status',
    comment: 'Trạng thái',
    default: 0,
  })
  @IsNumber()
  @Type()
  @IsOptional()
  status: number;
}
