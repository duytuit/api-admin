import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'id',
  })
  @Type()
  @IsNumber()
  id: number;

  /* Name */
  @Column({
    name: 'name',
    comment: 'Tên project',
    length: 500,
  })
  @IsString()
  name: string;

  @Column({
    name: 'status',
    comment: 'Thông báo trang thái (0 bình thường 1 đóng) ',
  })
  @Type()
  @IsNumber()
  status: number;
}
