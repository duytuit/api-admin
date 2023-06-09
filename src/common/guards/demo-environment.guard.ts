/*
 * @Author: Sheng.Jiang
 * @Date: 2022-01-29 11:12:00
 * @LastEditTime: 2022-09-18 11:07:12
 * @LastEditors: Please set LastEditors
 * @Description: Có thể hiện bảo vệ môi trường
 * @FilePath: /meimei-admin/src/common/guards/demo-environment.guard.ts
 * You can you up，no can no bb！！
 */
/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class DemoEnvironmentGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isDemoEnvironment =
      this.configService.get<boolean>('isDemoEnvironment');
    if (!isDemoEnvironment) return true;
    const request: Request = context.switchToHttp().getRequest();
    const allowUrlArr = ['/login', '/logout']; //Đi thôi

    if (
      request.method.toLocaleLowerCase() != 'get' &&
      !allowUrlArr.includes(request.url)
    )
      throw new ApiException(
        'Môi trường trình diễn, không được phép hoạt động',
      );
    return true;
  }
}
