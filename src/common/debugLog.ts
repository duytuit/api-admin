import { intentFinanceEnum } from './enums/type.enum';
import axios from 'axios';

export class LogDebug {
  static _khachdangkyvay(data?: any) {
    return new Promise((resolve) => {
      try {
        if (data) {
          let msg = '';
          msg += '\nTên Khách Hàng: \n' + data?.customerName;
          msg += '\nPhone: \n' + data?.phone || '';
          data?.intent
            ? (msg += '\nMục Đích Vay: \n' + intentFinanceEnum[data.intent])
            : '';
          data?.asset
            ? (msg += '\nTài Sản Thế Chấp: \n' + intentFinanceEnum[data.asset])
            : '';
          msg += '\nSố Tiền Vay: \n' + data?.amount;
          msg += '\n=========================================================';
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
