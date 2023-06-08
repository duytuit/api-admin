import { Type } from "class-transformer"
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator"
import { PaginationDto } from "src/common/dto/pagination.dto"
import { ParamsDto } from "src/common/dto/params.dto"

/* Nhật ký hoạt động truy vấn Pagling */
export class ReqOperLogDto extends PaginationDto {
    /* Mô -đun hệ thống */
    @IsOptional()
    @IsString()
    title?: string

    /* nhà điều hành*/
    @IsOptional()
    @IsString()
    operName?: string

    /* Các loại */
    @IsOptional()
    @IsString()
    businessType?: string

    /* Trạng thái */
    @IsOptional()
    @IsNumber()
    status?: number

    /* Thời gian hoạt động */
    @IsOptional()
    @IsObject()
    params?: ParamsDto
}

/* Nhật ký đăng nhập truy vấn Pagling */
export class ReqLogininforDto extends PaginationDto {
    /* Địa chỉ đăng nhập */
    @IsOptional()
    @IsString()
    ipaddr?: string

    /* tên tài khoản */
    @IsOptional()
    @IsString()
    userName?: string

    /* Trạng thái */
    @IsOptional()
    @Type()
    @IsString()
    status?: string

    /* Đăng nhập */
    @IsOptional()
    @IsObject()
    params?: ParamsDto
}

/* Truy vấn người dùng trực tuyến */
export class ReqOnline {
    /* Địa chỉ đăng nhập */
    @IsOptional()
    @IsString()
    ipaddr?: string

    /* tên tài khoản */
    @IsOptional()
    @IsString()
    userName?: string
}