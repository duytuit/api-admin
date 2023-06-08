/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-09 14:30:28
 * @LastEditTime: 2022-09-18 11:07:15
 * @LastEditors: Please set LastEditors
 * @Description: Bảo vệ đăng nhập , Bạn có thể đăng nhập vào bản ghi nhật ký đăng nhập
 * @FilePath: /meimei-admin/src/common/guards/local-auth.guard.ts
 * You can you up，no can no bb！！
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiException } from '../exceptions/api.exception';
import { LogService } from 'src/modules/monitor/log/log.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly logService: LogService) {
    super();
  }
  context: ExecutionContext;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.context = context;
    return super.canActivate(context);
  }

  /* Tích cực xử lý các lỗi,Ghi */
  handleRequest(err, user, info) {
    if (err || !user) {
      const request = this.context.switchToHttp().getRequest();
      request.user = user;
      this.logService.addLogininfor(request, err.response);
      throw err || new ApiException(err);
    }
    return user;
  }
}
