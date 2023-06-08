/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:30:53
 * @LastEditTime: 2022-10-06 10:37:51
 * @LastEditors: Please set LastEditors
 * @Description: Đăng nhập service
 * @FilePath: /meimei-admin/src/modules/login/login.service.ts
 * You can you up，no can no bb！！
 */

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CAPTCHA_IMG_KEY,
  USER_DEPTID_KEY,
  USER_DEPTNAME_KEY,
  USER_NICKNAME_KEY,
  USER_PERMISSIONS_KEY,
  USER_ROLEKEYS_KEY,
  USER_ROLEKS_KEY,
  USER_TOKEN_KEY,
  USER_USERNAME_KEY,
  USER_VERSION_KEY,
} from 'src/common/contants/redis.contant';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SharedService } from 'src/shared/shared.service';
import { MenuService } from '../system/menu/menu.service';
import { User } from '../system/user/entities/user.entity';
import { UserService } from '../system/user/user.service';
import { ResInfo } from './dto/res-login.dto';
import { Request } from 'express';
import { LogService } from '../monitor/log/log.service';
import { ConfigService } from '@nestjs/config';
import { Payload } from './login.interface';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class LoginService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly menuService: MenuService,
    private readonly logService: LogService,
    private readonly configService: ConfigService,
  ) {}

  /* Tạo hình ảnh mã xác minh */
  async createImageCaptcha() {
    const { data, text } = svgCaptcha.createMathExpr({
      // size: 4, //Độ dài mã xác minh
      // ignoreChars: '0o1i', // Loại trừ ký tự mã xác minh 0o1i
      noise: 3, // Số dòng giao thoa
      color: true, // Cho dù các ký tự của mã xác minh có màu hay không, không có mặc định. Nếu nền được đặt, có mặc định
      // background: '#cc9966', // Mã xác minh màu nền hình nền
      width: 115.5,
      height: 38,
    });
    const result = {
      img: data.toString(),
      uuid: this.sharedService.generateUUID(),
    };
    await this.redis.set(
      `${CAPTCHA_IMG_KEY}:${result.uuid}`,
      text,
      'EX',
      60 * 5,
    );
    return result;
  }

  /* Đăng nhập */
  async login(request: Request) {
    const { user } = request as any;
    const payload: Payload = { userId: user.userId, pv: 1 };
    //phát ra token
    let jwtSign = this.jwtService.sign(payload);
    //Thể hiện việc tái sử dụng môi trường Mã thông báo, hủy đăng nhập điểm đơn.
    if (this.configService.get<boolean>('isDemoEnvironment')) {
      const token = await this.redis.get(`${USER_TOKEN_KEY}:${user.userId}`);
      if (token) {
        jwtSign = token;
      }
    }
    //Lưu trữ số phiên bản mật khẩu để ngăn chặn mật khẩu bị quản trị viên thay đổi trong thời gian đăng nhập có thể tiếp tục đăng nhập
    await this.redis.set(`${USER_VERSION_KEY}:${user.userId}`, 1);
    //kho token, Ngăn các sự cố đăng nhập lặp đi lặp lại, đặt thời gian hết hạn mã thông báo(1 Nữ hoàng token Hết hạn tự động)Và hủy bỏ hoạt động token。
    await this.redis.set(
      `${USER_TOKEN_KEY}:${user.userId}`,
      jwtSign,
      'EX',
      60 * 60 * 24,
    );
    //Gọi giao diện người dùng trực tuyến lưu trữ
    await this.logService.addLogininfor(
      request,
      'đăng nhập thành công',
      `${USER_TOKEN_KEY}:${user.userId}`,
    );
    return { token: jwtSign };
  }

  /* đăng xuất */
  async logout(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      if (await this.redis.get(`${USER_TOKEN_KEY}:${payload.userId}`)) {
        await this.redis.del(`${USER_TOKEN_KEY}:${payload.userId}`);
      }
    } catch (error) {}
  }

  /* Nhận thông tin người dùng */
  async getInfo(userId: number): Promise<ResInfo> {
    const user: User = await this.userService.findOneUserAllById(userId);
    if (!user) throw new ApiException('Thông tin người dùng có Sửa', 401);
    const deptId = user.dept ? user.dept.deptId : '';
    const deptName = user.dept ? user.dept.deptName : '';
    const roleKeyArr: string[] = user.roles.map((role) => role.roleKey);
    let permissions = [];
    if (!roleKeyArr.length) {
      permissions = [];
    } else {
      if (roleKeyArr.find((roleKey) => roleKey == 'admin')) {
        permissions = ['*:*:*'];
      } else {
        const roleIdArr = user.roles.map((role) => role.roleId);
        permissions = await this.menuService.getAllPermissionsByRoles(
          roleIdArr,
        );
      }
    }
    /*Lưu trữ thông tin người dùng, mảng và mảng ký tự vào bộ đệm */
    const promiseArr = [
      this.redis.set(`${USER_USERNAME_KEY}:${userId}`, user.userName),
      this.redis.set(`${USER_NICKNAME_KEY}:${userId}`, user.nickName),
      this.redis.set(`${USER_DEPTID_KEY}:${userId}`, deptId),
      this.redis.set(`${USER_DEPTNAME_KEY}:${userId}`, deptName),
      this.redis.set(
        `${USER_PERMISSIONS_KEY}:${userId}`,
        JSON.stringify(permissions),
      ),
      this.redis.set(
        `${USER_ROLEKEYS_KEY}:${userId}`,
        JSON.stringify(roleKeyArr),
      ),
      this.redis.set(
        `${USER_ROLEKS_KEY}:${userId}`,
        JSON.stringify(user.roles),
      ),
    ];
    await Promise.all(promiseArr);
    return {
      permissions,
      roles: roleKeyArr,
      user,
    };
  }

  /* Nhận menu của người dùng hiện tại */
  async getRouterByUser(userId: number) {
    const user: User = await this.userService.findOneUserAllById(userId);
    const isAdmin = user.roles.some((role) => role.roleKey === 'admin');
    const roleIdArr = user.roles.map((role) => role.roleId);
    if (!isAdmin && !roleIdArr.length) return [];
    return await this.menuService.getMenuList(isAdmin, roleIdArr);
  }
}
