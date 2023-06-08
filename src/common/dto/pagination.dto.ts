/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-09 10:11:33
 * @LastEditTime: 2022-09-18 11:07:46
 * @LastEditors: Please set LastEditors
 * @Description: Tham số yêu cầu fagling
 * @FilePath: /meimei-admin/src/common/dto/pagination.dto.ts
 * You can you up，no can no bb！！
 */
import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  /* trang hiện tại */
  @IsOptional()
  @Type()
  @IsNumber()
  public pageNum?: number;

  /* Số trên mỗi trang */
  @IsOptional()
  @Type()
  @IsNumber()
  public pageSize?: number;

  /* Sắp xếp trường */
  @IsOptional()
  @Type()
  @IsString()
  public orderByColumn?: string;

  /* Sắp xếp theo */
  @IsOptional()
  @Type()
  @IsString()
  public isAsc?: string;

  /* mysql Bỏ qua số */
  @ApiHideProperty()
  public skip: number;
  /* mysql Trả lại số */
  @ApiHideProperty()
  public take: number;
}
