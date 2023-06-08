/*
 * @Author: Sheng.Jiang
 * @Date: 2021-09-03 11:32:52
 * @LastEditTime: 2022-09-26 23:15:35
 * @LastEditors: Please set LastEditors
 * @Description: Tệp cấu hình môi trường kiểm tra
 * @FilePath: /meimei-admin/src/config/config.development.ts
 * You can you up，no can no bb！！
 */
import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm Cấu hình
  database: {
    type: 'mysql', //Loại cơ sở dữ liệu
    host: process.env.MYSQL_HOST || 'localhost', //Địa chỉ cơ sở dữ liệu
    port: process.env.MYSQL_PORT || 3306, //Cổng cơ sở dữ liệu
    username: process.env.MYSQL_USERNAME || 'root', //Tài khoản cơ sở dữ liệu
    password: process.env.MYSQL_PASSWORD || 'Duytuit89!', //Mật khẩu cơ sở dữ liệu
    database: process.env.MYSQL_DATABASE || 'cms_admin', //Tên cơ sở dữ liệu
    autoLoadModels: true, //Mô hình được tự động tải mà không cần thực hành lặp lại tại cấu hình.
    synchronize: true, //Nếu mô hình tự động tải cho true sẽ được đồng bộ hóa vào cơ sở dữ liệu và môi trường sản xuất phải được đóng, nếu không dữ liệu bị mất do xóa trường.
    logging: true, //Có bắt đầu bản ghi nhật ký không
  },
  // redis Cấu hình
  redis: {
    config: {
      url: 'redis://localhost:6379/0',
    },
  },

  //Hàng đợi cấu hình Reids
  bullRedis: {
    host: 'localhost',
    port: '6379',
    password: '',
  },

  //Địa chỉ tải lên tệp, chẳng hạn như: E:/upload/test
  uploadPath: '',

  // Có thể chứng minh
  isDemoEnvironment: false,
});
