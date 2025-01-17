/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/constants';
import { AuthGuard } from '@nestjs/passport';
import { CopyTradeDto } from './dto/copyTradeDto';
import { CopyTrade } from '@app/typeorm/entities/copy.trade.entity';
import { CopyTradeService } from './copytrade.service';

@ApiTags('CopyTrade')
@Controller(Routes.CopyTrade)
export class CopyTradeController {
  constructor(private readonly copyTradeService: CopyTradeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('subscribe')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Subscribe user' })
  @ApiResponse({
    status: 204,
    description: 'User subscribed successfully',
  })
  async subscribeUser(
    @Body(new ValidationPipe()) copyTradeDto: CopyTradeDto,
    @Req() req: any,
  ): Promise<CopyTradeDto> {
    const userId = req.user.id;
    return this.copyTradeService.subscribeUser(userId, copyTradeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Trades fetched successfully',
  })
  async changeUserStatus(@Req() req: any): Promise<CopyTrade[]> {
    const userId = req.user.id;
    return this.copyTradeService.getSubscribedUser(userId);
  }
}
