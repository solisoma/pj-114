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
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes } from 'src/utils/constants';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './myWallet.service';
import {
  CreateWalletDto,
  GetWalletDto,
  UpdateWalletDto,
} from './dto/myWalletDto';
import { MyWallet } from '@app/typeorm/entities/wallet.entity';
import { UploadService } from '@app/upload/upload.service';

@ApiTags('My Wallet')
@Controller(Routes.MyWallet)
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly uploadService: UploadService,
  ) {}

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
    @Res() res: any,
  ): Promise<MyWallet> {
    await this.uploadService.getUploadMiddleware(
      './src/public/qrcode',
      [
        { name: 'qrcode', maxCount: 1 }, // Handle 'front'
      ],
      ['png', 'jpeg', 'pdf'],
    )(req, res);

    const { id } = req.user;

    createWalletDto = {
      ...req.body,
      qrcode: req.files?.qrcode ? req.files.qrcode[0].path : '', // Handle 'front'
    };

    return res
      .status(200)
      .json(await this.walletService.createWallet(id, createWalletDto));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'wallets fetched successfully',
  })
  async getWallet(
    @Query(new ValidationPipe()) param: GetWalletDto,
  ): Promise<MyWallet> {
    return this.walletService.getWallet(param.name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'wallets fetched successfully',
  })
  async getAllWallet(): Promise<MyWallet[]> {
    return this.walletService.getAllWallet();
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
    @Req() req: any,
    @Res() res: any,
  ): Promise<MyWallet> {
    await this.uploadService.getUploadMiddleware(
      './src/public/qrcode',
      [
        { name: 'qrcode', maxCount: 1 }, // Handle 'front'
      ],
      ['png', 'jpeg', 'pdf'],
    )(req, res);

    const { id } = req.user;

    updateWallet = {
      ...req.body,
      qrcode: req.files?.qrcode ? req.files.qrcode[0].path : '', // Handle 'front'
    };
    return res
      .status(200)
      .json(await this.walletService.updateWallet(id, updateWallet));
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
    @Req() req: any,
  ): Promise<{ id: number; deleted: boolean }> {
    const { d: userId } = req.user;
    return this.walletService.deleteWallet(userId, id);
  }
}
