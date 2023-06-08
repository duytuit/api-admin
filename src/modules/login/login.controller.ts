/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:30:39
 * @LastEditTime: 2022-09-23 21:41:08
 * @LastEditors: Please set LastEditors
 * @Description: Đăng nhập controller
 * @FilePath: /meimei-admin/src/modules/login/login.controller.ts
 * You can you up，no can no bb！！
 */

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataObj } from 'src/common/class/data-obj.class';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Router } from '../system/menu/dto/res-menu.dto';
import { ReqLoginDto } from './dto/req-login.dto';
import { ResImageCaptchaDto, ResLoginDto } from './dto/res-login.dto';
import { LoginService } from './login.service';
import { Request } from 'express';
@ApiTags('Đăng nhập')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /* Nhận mã xác minh hình ảnh */
  @Get('captchaImage')
  @Public()
  async captchaImage(): Promise<ResImageCaptchaDto> {
    return await this.loginService.createImageCaptcha();
  }

  /* Đăng nhập người dùng */
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() reqLoginDto: ReqLoginDto,
    @Req() req: Request,
  ): Promise<ResLoginDto> {
    return await this.loginService.login(req);
  }

  /* Nhận thông tin người dùng */
  @Get('getInfo')
  async getInfo(@User(UserEnum.userId) userId: number) {
    return await this.loginService.getInfo(userId);
  }

  /* Nhận thông tin tuyến đường người dùng */
  @Get('getRouters')
  @ApiDataResponse(typeEnum.objectArr, Router)
  async getRouters(@User(UserEnum.userId) userId: number) {
    const router = await this.loginService.getRouterByUser(userId);
    return DataObj.create(router);
  }

  /* đăng xuất */
  @Public()
  @Post('logout')
  async logout(@Headers('Authorization') authorization: string) {
    if (authorization) {
      const token = authorization.slice(7);
      await this.loginService.logout(token);
    }
  }
}
