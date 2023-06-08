/*
 * @Author: Sheng.Jiang
 * @Date: 2021-10-18 13:21:16
 * @LastEditTime: 2022-09-14 17:38:12
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \meimei-admin\src\config\configuration.ts
 * You can you up，no can no bb！！
 */

import { Logger } from '@nestjs/common';

// Xác định xem hệ thống có phải là môi trường phát triển không
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

// Xác định và sử dụng cấu hình dựa trên các biến môi trường
export default () => {
  let envConfig: IConfig = {};
  try {
    envConfig = require(`./config.${process.env.NODE_ENV}`).default;
    //Liên kết tệp tải tệp vào biến môi trường
    process.env.uploadPath = envConfig.uploadPath ?? '/upload';
  } catch (e) {
    const logger = new Logger('ConfigModule');
    logger.error(e);
  }

  // Quay trở lại cấu hình môi trường
  return envConfig;
};

// Giao diện tệp cấu hình
export interface IConfig {
  /**
   * Quản lý nền JWT token Chìa khóa
   */
  jwt?: {
    secret: string;
  };

  /**
   * Đường dẫn tải lên tệp, đường dẫn tuyệt đối, ví dụ: ví dụ: E:/upload/test
   */
  uploadPath?: string;

  /**
   * Cấu hình cơ sở dữ liệu
   */
  database?: {
    type?: string;
    host?: string;
    port?: number | string;
    username?: string;
    password?: string;
    database?: string;
    autoLoadModels: boolean; // Nếu bạn làm true，Mô hình sẽ được tự động tải (mặc định:false)
    synchronize?: boolean; //Nếu bạn lào, mô hình tải tự động sẽ đồng bộ hóa
    logging?: any;
  };

  /**
   * redis Cấu hình
   */
  redis?: {
    config: {
      url: string;
    };
  };

  /* Cấu hình hàng đợi */

  bullRedis?: {
    host: string;
    port: string;
    password: string;
  };

  /* Có thể chứng minh */
  isDemoEnvironment?: boolean;
}
