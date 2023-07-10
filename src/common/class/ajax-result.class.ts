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
  readonly data: any;
  [key: string]: any;

  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    if (Array.isArray(data) || data == null) {
      this.data = data;
    } else {
      Object.assign(this, data);
      this.data = data;
    }
  }

  static success(data?: any, msg = 'Hoạt động thành công') {
    return new AjaxResult(200, msg, data);
  }

  static error(msg = 'lỗi hệ thống', code = 500, data) {
    return new AjaxResult(code, msg, data);
  }
}
export class Alepay {
  orderCode: string;
  customMerchantId: string;
  amount: number;
  currency: string;
  orderDescription: string;
  totalItem: number;
  checkoutType: number;
  installment: boolean;
  cancelUrl: string;
  returnUrl: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;
  buyerCity: number;
  buyerCountry: string;
  paymentHours: number;
  language: string;
  allowDomestic: boolean;
}
