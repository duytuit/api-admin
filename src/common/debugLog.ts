import { assetFinanceEnum, intentFinanceEnum } from './enums/type.enum';
import axios from 'axios';
import { Helper } from './utils/helper';

export class LogDebug {
  static _khachdangkyvay(data?: any) {
    return new Promise((resolve) => {
      try {
        if (data) {
          let msg = data?.source;
          msg += '\nTên Khách Hàng: \n' + data?.customerName;
          msg += '\nPhone: \n' + data?.phone || '';
          data?.intent
            ? (msg += '\nMục Đích Vay: \n' + intentFinanceEnum[data.intent])
            : '';
          data?.asset
            ? (msg += '\nTài Sản Thế Chấp: \n' + assetFinanceEnum[data.asset])
            : '';
          data?.amount
            ? (msg +=
                '\nSố Tiền Vay: \n' +
                Helper.formatCurrency(data.amount.toString()))
            : '';
          msg +=
            '\n=========================' +
            Helper.getTime() +
            '================================';
          const res = encodeURI(msg);
          axios.get(
            'https://api.telegram.org/bot6205405693:AAFCBPQ9cjEHOcobgbHb_bprfDo8ZxOviMc/sendmessage?chat_id=-819218541&text=' +
              res,
          );
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  static _info(data?: any) {
    return new Promise((resolve) => {
      try {
        let msg = 'Message: ' + data;
        msg += '\nLink: ' + 'https://t.me/%2bVTL1UvQHQmVkZjM1';
        msg += '\n\nDesc: ';
        msg += '\nLink chat: ' + 'http://103.143.209.74:8080/';
        const res = encodeURI(msg);
        axios.get(
          'https://api.telegram.org/bot6099582942:AAFOS3MT5V10dTAMVRKnXz3v4_ctrbioJJk/sendmessage?chat_id=-949648605&text=' +
            res,
        );
      } catch (error) {
        console.error(error);
      }
    });
  }

  static _error(data?: any) {
    return new Promise((resolve) => {
      try {
        let msg = 'Message: ' + data;
        msg += '\nLink: ' + 'https://t.me/%2bVTL1UvQHQmVkZjM1';
        msg += '\n\nDesc: ';
        msg += '\nLink chat: ' + 'http://103.143.209.74:8080/';
        const res = encodeURI(msg);
        axios.get(
          'https://api.telegram.org/bot6099582942:AAFOS3MT5V10dTAMVRKnXz3v4_ctrbioJJk/sendmessage?chat_id=-949648605&text=' +
            res,
        );
      } catch (error) {
        console.error(error);
      }
    });
  }
  static get_url_extension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }
}
