/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('static/:path(*)')
  getImage(@Param('path') imgPath: string, @Res() res: Response) {
    const imagePath = join(process.cwd(), imgPath);
    return res.sendFile(imagePath);
  }
}
