/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 19:00:14
 * @LastEditTime: 2022-09-18 11:08:17
 * @LastEditors: Please set LastEditors
 * @Description: Trả về đối tượng gói giá trị
 * @FilePath: /meimei-admin/src/common/class/ajax-result.class.ts
 * You can you up，no can no bb！！
 */
export class AjaxResult {
  readonly code: number;
  readonly msg: string;
  [key: string]: any;

  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    Object.assign(this, data);
  }

  static success(data?: any, msg = 'Hoạt động thành công') {
    return new AjaxResult(200, msg, data);
  }

  static error(msg = 'lỗi hệ thống', code = 500) {
    return new AjaxResult(code, msg, null);
  }
}
