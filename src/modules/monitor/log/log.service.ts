/*
https://docs.nestjs.com/providers#services
*/

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { USER_ONLINE_KEY } from 'src/common/contants/redis.contant';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { User } from 'src/modules/system/user/entities/user.entity';
import { SharedService } from 'src/shared/shared.service';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';
import { ReqLogininforDto, ReqOperLogDto } from './dto/req-log.dto';
import { Logininfor } from './entities/logininfor.entity';
import { OperLog } from './entities/oper_log.entity';
import * as uaParser from 'ua-parser-js';
import { Request } from 'express';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Logininfor)
    private readonly logininforRepository: Repository<Logininfor>,
    @InjectRepository(OperLog)
    private readonly operLogRepository: Repository<OperLog>,
    @InjectRedis() private readonly redis: Redis,
    private readonly sharedService: SharedService,
  ) {}
  // Thêm Nhật ký hoạt động
  async addOperLog(operLog: OperLog) {
    return await this.operLogRepository.save(operLog);
  }

  //Truy vấn phân trang
  async operLogList(
    reqOperLogDto: ReqOperLogDto,
  ): Promise<PaginatedDto<OperLog>> {
    const where: FindOptionsWhere<OperLog> = {};
    if (reqOperLogDto.title) {
      where.title = Like(`%${reqOperLogDto.title}%`);
    }
    if (reqOperLogDto.operName) {
      where.operName = Like(`%${reqOperLogDto.operName}%`);
    }
    if (reqOperLogDto.businessType) {
      where.businessType = reqOperLogDto.businessType;
    }
    if (reqOperLogDto.status) {
      where.status = reqOperLogDto.status;
    }
    if (reqOperLogDto.params) {
      where.operTime = Between(
        reqOperLogDto.params.beginTime,
        moment(reqOperLogDto.params.endTime).add(1, 'day').format(),
      );
    }
    const queryBuilder = this.operLogRepository
      .createQueryBuilder('operLog')
      .where(where);
    if (reqOperLogDto.orderByColumn) {
      //Sắp xếp trở lại
      const order = reqOperLogDto.isAsc === 'descending' ? 'DESC' : 'ASC';
      queryBuilder.orderBy(`operLog.${reqOperLogDto.orderByColumn}`, order);
    }
    const result = await queryBuilder
      .addOrderBy('operLog.operTime', 'DESC')
      .skip(reqOperLogDto.skip)
      .take(reqOperLogDto.take)
      .getManyAndCount();
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* Xóa nhật ký hoạt động */
  async deleteOperLog(operLogArr: string[] | number[]) {
    return this.operLogRepository.delete(operLogArr);
  }

  /* Xóa nhật ký hoạt động */
  async cleanOperLog() {
    return this.operLogRepository
      .createQueryBuilder('operLog')
      .delete()
      .execute();
  }

  /* Thêm Đăng nhập nhật ký */
  async addLogininfor(request: Request, msg: string, token?: string) {
    const logininfor = new Logininfor();
    const { username } = request.body;
    const { browser, os } = uaParser(request.headers['user-agent']); //Nhận thông tin máy tính của người dùng
    logininfor.userName = username;
    logininfor.ipaddr = this.sharedService.getReqIP(request);
    logininfor.loginLocation = await this.sharedService.getLocation(
      logininfor.ipaddr,
    );
    logininfor.status = token ? '0' : '1';
    logininfor.msg = msg;
    logininfor.loginTime = moment().format('YYYY-MM-DDTHH:mm:ss');
    logininfor.browser = browser.name + browser.version.split('.')[0];
    logininfor.os = os.name + os.version;
    if (token) {
      //Nếu đăng nhập thành công, hãy ghi lại thông tin đăng nhập này để tạo điều kiện cho người dùng trực tuyến yêu cầu
      const user: User = (request as any).user;
      const data = { deptName: '', tokenId: token };
      if (user.dept) {
        data.deptName = user.dept.deptName;
      }
      const loginUser = Object.assign(logininfor, data);
      await this.redis.set(
        `${USER_ONLINE_KEY}:${user.userId}`,
        JSON.stringify(loginUser),
        'EX',
        60 * 60 * 24,
      );
    }
    return await this.logininforRepository.save(logininfor);
  }

  /* Nhật ký đăng nhập truy vấn Pagling */
  async logininforList(
    reqLogininforDto: ReqLogininforDto,
  ): Promise<PaginatedDto<Logininfor>> {
    const where: FindOptionsWhere<Logininfor> = {};
    if (reqLogininforDto.ipaddr) {
      where.ipaddr = Like(`%${reqLogininforDto.ipaddr}%`);
    }
    if (reqLogininforDto.userName) {
      where.userName = Like(`%${reqLogininforDto.userName}%`);
    }
    if (reqLogininforDto.status) {
      where.status = reqLogininforDto.status;
    }
    if (reqLogininforDto.params) {
      where.loginTime = Between(
        reqLogininforDto.params.beginTime,
        moment(reqLogininforDto.params.endTime).add(1, 'day').format(),
      );
    }
    const queryBuilder = this.logininforRepository
      .createQueryBuilder('logininfor')
      .where(where);
    if (reqLogininforDto.orderByColumn) {
      // Sắp xếp trở lại
      const order = reqLogininforDto.isAsc === 'descending' ? 'DESC' : 'ASC';
      queryBuilder.orderBy(
        `logininfor.${reqLogininforDto.orderByColumn}`,
        order,
      );
    }
    const result = await queryBuilder
      .skip(reqLogininforDto.skip)
      .take(reqLogininforDto.take)
      .getManyAndCount();
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* Xóa nhật ký hoạt động */
  async deleteLogininfor(logininforArr: string[] | number[]) {
    return this.logininforRepository.delete(logininforArr);
  }

  /* Đăng nhập vào Đăng nhập */
  async cleanLogininfor() {
    return this.logininforRepository
      .createQueryBuilder('logininfor')
      .delete()
      .execute();
  }
}
