/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 19:47:38
 * @LastEditTime: 2022-09-18 11:07:04
 * @LastEditors: Please set LastEditors
 * @Description: Hồ sơ ghi nhật ký hoạt động đánh chặn
 * @FilePath: /meimei-admin/src/common/interceptors/operation-log.interceptor.ts
 * You can you up，no can no bb！！
 */

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OperLog } from 'src/modules/monitor/log/entities/oper_log.entity';
import { LogService } from 'src/modules/monitor/log/log.service';
import { SharedService } from 'src/shared/shared.service';
import { AjaxResult } from '../class/ajax-result.class';
import { LOG_KEY_METADATA } from '../contants/decorator.contant';
import {
  USER_DEPTNAME_KEY,
  USER_USERNAME_KEY,
} from '../contants/redis.contant';
import { LogOption } from '../decorators/log.decorator';
import { AllExceptionsFilter } from '../filters/all-exception.filter';

@Injectable()
export class OperationLogInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
    private readonly logService: LogService,
    private readonly sharedService: SharedService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        next: (data) => {
          return this.log(context, data);
        },
        error: (e) => {
          const allExceptionsFilter = new AllExceptionsFilter();
          const { result } = allExceptionsFilter.errorResult(e);
          return this.log(context, result);
        },
      }),
    );
  }

  /* Ghi lại nhật ký hoạt động */
  async log(context: ExecutionContext, data: AjaxResult) {
    const logOption = this.reflector.get<LogOption>(
      LOG_KEY_METADATA,
      context.getHandler(),
    );
    if (!logOption) return;
    const request = context.switchToHttp().getRequest();
    const method = request.method.toUpperCase();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const operLog = new OperLog();
    /* Tiêu đề Mô-đun */
    operLog.title = logOption.title;
    /* Loại hình kinh doanh */
    operLog.businessType = logOption.businessType;
    /* Cách yêu cầu */
    operLog.requestMethod = method;
    /* Tên phương thức */
    operLog.method = `${className}.${handlerName}()`;
    if (request.user) {
      /* nhà điều hành */
      const userId = request.user.userId;
      const userName = await this.redis.get(`${USER_USERNAME_KEY}:${userId}`);
      operLog.operName = userName;
      /* Tên bộ phận */
      const deptName = await this.redis.get(`${USER_DEPTNAME_KEY}:${userId}`);
      operLog.deptName = deptName;
      /* hỏi url */
      operLog.operUrl = request.url;
      /* hỏi ip */
      operLog.operIp = this.sharedService.getReqIP(request);
      /* Địa chỉ yêu cầu */
      operLog.operLocation = await this.sharedService.getLocation(
        operLog.operIp,
      );
      /* Yêu cầu tham số */
      if (logOption.isSaveRequestData) {
        const data = {
          params: request.params,
          query: request.query,
          body: request.body,
        };
        operLog.operParam = JSON.stringify(data);
      }
      /* Yêu cầu thành công */
      if ((data && data.code === 200) || data instanceof StreamableFile) {
        //Nếu nó là luồng, nó sẽ thành công
        operLog.status = 0;
      } else {
        //Yêu cầu thất bại
        operLog.status = 1;
        operLog.errorMsg = data && data.msg;
      }
      /* Ghi lại giá trị trả về */
      if (logOption.isSaveResponseData) {
        operLog.jsonResult = JSON.stringify(data);
      }
      // Thời gian yêu cầu
      operLog.operTime = moment().format('YYYY-MM-DDTHH:mm:ss');
      return this.logService.addOperLog(operLog);
    }
  }
}
