/*
 * @Author: Sheng.Jiang
 * @Date: 2021-09-03 11:32:52
 * @LastEditTime: 2022-09-14 17:38:03
 * @LastEditors: Please set LastEditors
 * @Description: Tệp cấu hình môi trường chính thức
 * @FilePath: \meimei-admin\src\config\config.production.ts
 * You can you up，no can no bb！！
 */
import { defineConfig } from './defineConfig';

export default defineConfig({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm Cấu hình
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || 'duytuit',
    password: process.env.MYSQL_PASSWORD || 'Duytuit89!',
    database: process.env.MYSQL_DATABASE || 'cms_admin',
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  },
  // redis Cấu hình
  redis: {
    config: {
      url: 'redis://localhost:6379/0',
    },
  },

  // xếp hàng reids Cấu hình
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
