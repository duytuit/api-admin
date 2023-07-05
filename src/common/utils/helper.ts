import { customAlphabet } from 'nanoid';

export class Helper {
  static convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  static convertToUnderlined(Text) {
    return Text.toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^\w-]+/g, '');
  }
  static generateRamdomByLength(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  /**
   * @description: Tạo số ngẫu nhiên
   * @param {number} length
   * @param {*} placeholder
   * @return {*}
   */
  static generateRandomCustom(
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  ): string {
    const customNanoid = customAlphabet(placeholder, length);
    return customNanoid();
  }
  static getTimeNow(name_log?: string) {
    const today = new Date();
    const all_time =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate() +
      ' ' +
      today.getHours() +
      ':' +
      today.getMinutes() +
      ':' +
      today.getSeconds() +
      ':' +
      today.getMilliseconds();
    console.log(name_log, all_time);
  }
}
