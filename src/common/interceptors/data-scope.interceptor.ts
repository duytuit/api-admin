/*
 * @Author: Sheng.Jiang
 * @Date: 2022-01-05 19:43:12
 * @LastEditTime: 2022-10-17 15:37:29
 * @LastEditors: Please set LastEditors
 * @Description: Quyền dữ liệu đánh chặn
 * @FilePath: \meimei-admin\src\common\interceptors\data-scope.interceptor.ts
 * You can you up，no can no bb！！
 */

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { concat, Observable } from 'rxjs';
import { Role } from 'src/modules/system/role/entities/role.entity';
import { DATASCOPE_KEY_METADATA } from '../contants/decorator.contant';
import { USER_DEPTID_KEY, USER_ROLEKS_KEY } from '../contants/redis.contant';
import { DeptOrUserAlias } from '../decorators/datascope.decorator';

@Injectable()
export class DataScopeInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const aliaObj: DeptOrUserAlias = this.reflector.get(
      DATASCOPE_KEY_METADATA,
      context.getHandler(),
    );
    if (aliaObj) {
      const request = context.switchToHttp().getRequest();
      return concat(this.setDataScope(request, aliaObj), next.handle());
    } else {
      return next.handle();
    }
  }

  /* Có được quyền dữ liệu */
  async setDataScope(request, aliaObj: DeptOrUserAlias) {
    const { userId } = request.user;
    let sqlString = '';
    /* Nếu đó là một quản trị viên siêu , Chỉ có quyền sở hữu */
    const roleArr: Role[] = JSON.parse(
      await this.redis.get(`${USER_ROLEKS_KEY}:${userId}`),
    );
    if (!roleArr.map((role) => role.roleKey).includes('admin')) {
      const userDeptId = await this.redis.get(`${USER_DEPTID_KEY}:${userId}`);
      const deptId = userDeptId ? userDeptId : null;
      for (let index = 0; index < roleArr.length; index++) {
        const role = roleArr[index];
        const dataScope = role.dataScope;
        if (dataScope == '1') {
          //Tất cả các quyền dữ liệu
          sqlString = '';
          return;
        } else if (dataScope == '2') {
          //Quyền dữ liệu tùy chỉnh
          sqlString += ` OR ${aliaObj.deptAlias}.dept_id IN ( SELECT deptDeptId FROM role_depts_dept WHERE roleRoleId = ${role.roleId} )`;
        } else if (dataScope == '3') {
          //Quyền dữ liệu của trụ sở
          sqlString += ` OR ${aliaObj.deptAlias}.dept_id = ${deptId}`;
        } else if (dataScope == '4') {
          //Quyền dữ liệu của bộ phận này và bên dưới
          sqlString += ` OR ${aliaObj.deptAlias}.dept_id IN ( SELECT dept_id FROM dept WHERE concat('.',mpath) like '%.${deptId}.%')`;
        } else if (dataScope == '5') {
          //Chỉ các quyền dữ liệu
          sqlString += ` OR ${aliaObj.userAlias}.user_id = ${userId}`;
        }
      }
    }
    if (sqlString) {
      request.dataScope = '(' + sqlString.substring(4) + ')';
    }
  }
}
