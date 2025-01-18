/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/constants';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';
import { CreateWalletDto, UpdateWalletDto } from './dto/walletDto';
import { CryptoWallet } from '@app/typeorm/entities/bank.account.entity';

@ApiTags('Wallet')
@Controller(Routes.Wallet)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'create wallet' })
  @ApiResponse({
    status: 204,
    description: 'User subscribed successfully',
  })
  async createUser(
    @Body(new ValidationPipe()) createWalletDto: CreateWalletDto,
    @Req() req: any,
  ): Promise<CryptoWallet> {
    const userId = req.user.id;
    return this.walletService.createWallet(userId, createWalletDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'wallets fetched successfully',
  })
  async getWallet(@Req() req: any): Promise<CryptoWallet[]> {
    const userId = req.user.id;
    return this.walletService.getWallet(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'wallets updated successfully',
  })
  async updateWallet(
    @Body(new ValidationPipe()) updateWallet: UpdateWalletDto,
  ): Promise<CryptoWallet> {
    return this.walletService.updateWallet(updateWallet);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'wallets deleted successfully',
  })
  async deleteWallet(
    @Param('id') id: number,
  ): Promise<{ id: number; deleted: boolean }> {
    return this.walletService.deleteWallet(id);
  }
}
