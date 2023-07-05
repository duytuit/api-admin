/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-22 16:54:36
 * @LastEditTime: 2022-09-18 11:08:00
 * @LastEditors: Please set LastEditors
 * @Description: Ghi nhật ký thiết bị trang trí
 * @FilePath: /meimei-admin/src/common/decorators/log.decorator.ts
 * You can you up，no can no bb！！
 */
import { SetMetadata } from '@nestjs/common';
import { LOG_KEY_METADATA } from '../contants/decorator.contant';

/*
https://docs.nestjs.com/openapi/decorators#decorators
*/
export enum BusinessTypeEnum {
  /* khác */
  other = '1',

  /* chèn */
  insert = '2',

  /* thay mới */
  update = '3',

  /* Xoá */
  delete = '4',

  /* Ủy quyền */
  grant = '5',

  /* Xuất Excel */
  export = '6',

  /* Nhập Excel */
  import = '7',

  /* Lực lượng */
  force = '8',

  /* Di dời */
  clean = '9',
}

export class LogOption {
  /* Mô -đun hoạt động */
  title: string;

  /* Chức năng hoạt động */
  businessType?: BusinessTypeEnum = BusinessTypeEnum.other;

  /* Có lưu tham số yêu cầu không */
  isSaveRequestData?: boolean = true;

  /* Có lưu tham số phản hồi không */
  isSaveResponseData?: boolean = true;
}

export const Log = (logOption: LogOption) => {
  const option = Object.assign(new LogOption(), logOption);
  return SetMetadata(LOG_KEY_METADATA, option);
};
