/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Routes, Services } from 'src/utils/constants';
import { IUsersService } from './users';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/changePasswordDto';
import {
  adminChangeUserStatusDto,
  DepositDto,
  IdDto,
  KycDto,
  ProofDto,
  transcDetailsDto,
  TransferDto,
  UserDto,
} from './dto/user.general.dto';
import { NullableType } from '@app/utils/types/nullable.type';
import { User } from '@app/typeorm/entities/user.entity';
import { Transaction } from '@app/typeorm/entities/transaction.entity';
import { UpdateTrxDto } from '@app/transaction/dto/transactionDto';
import { TransactionService } from '@app/transaction/transaction.service';
import { UploadService } from '@app/upload/upload.service';
import { Referral } from '@app/typeorm/entities/referral.entity';

@ApiTags('User')
@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUsersService,
    private readonly trxService: TransactionService,
    private readonly uploadService: UploadService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Change Password' })
  @ApiResponse({
    status: 204,
    description: 'Password successfully changed!',
  })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ): Promise<void> {
    const userId = req.user.id;
    return this.userService.changePassword(userId, changePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-user-status')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Change user status' })
  @ApiResponse({
    status: 204,
    description: 'Status successfully changed!',
  })
  async changeUserStatus(
    @Body() userDetail: adminChangeUserStatusDto,
    @Req() req: any,
  ): Promise<void> {
    const userId = req.user.id;
    return this.userService.adminChangeUserStatus(userId, userDetail);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-user')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 204,
    description: 'User fetched successfully',
  })
  async getUser(
    @Query(new ValidationPipe()) param: UserDto,
  ): Promise<NullableType<User>> {
    return this.userService.findOneUser({ id: Number(param.userId) });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-trx')
  @ApiOperation({ summary: 'Get transaction' })
  @ApiResponse({
    status: 204,
    description: 'Transactions fetched successfully',
  })
  async getTrx(
    @Query(new ValidationPipe()) param: IdDto,
    @Req() req: any,
  ): Promise<Transaction[]> {
    const id = param.userId || req.user.id;
    return this.userService.getTrx(Number(id), param.category);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('referrals')
  @ApiOperation({ summary: 'Get referrals' })
  @ApiResponse({
    status: 204,
    description: 'Referrals fetched successfully',
  })
  async getReferrals(@Req() req: any): Promise<Referral[]> {
    const id = req.user.id;
    return this.userService.getRefferrals(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all-users')
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({
    status: 204,
    description: 'Users fetched successfully',
  })
  async getUsers(@Req() req: any): Promise<User[]> {
    const {
      user: { id },
    } = req;
    return this.userService.getAllUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update-balance')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update balance' })
  @ApiResponse({
    status: 204,
    description: 'Balance updated successfully',
  })
  async updateBalance(
    @Body() transcDetails: transcDetailsDto,
    @Req() req: any,
  ): Promise<void> {
    const userId = req.user.id;
    return this.userService.updateBalance(userId, transcDetails);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('transfer')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'transfer' })
  @ApiResponse({
    status: 204,
    description: 'Balance updated successfully',
  })
  async transfer(
    @Body() transcDetails: TransferDto,
    @Req() req: any,
  ): Promise<void> {
    const userId = req.user.id;
    return this.userService.transfer(userId, transcDetails);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('withdraw')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update balance' })
  @ApiResponse({
    status: 204,
    description: 'Balance updated successfully',
  })
  async withdraw(
    @Body() transcDetails: DepositDto,
    @Req() req: any,
  ): Promise<Transaction> {
    const userId = req.user.id;
    return this.userService.withdraw(userId, transcDetails);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('deposit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update balance' })
  @ApiResponse({
    status: 204,
    description: 'Balance updated successfully',
  })
  async deposit(
    @Body() transcDetails: DepositDto,
    @Req() req: any,
  ): Promise<Transaction> {
    const userId = req.user.id;
    return this.userService.deposit(userId, transcDetails);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update/trx')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update balance' })
  @ApiResponse({
    status: 204,
    description: 'Balance updated successfully',
  })
  async updateTrxStatus(
    @Body() transcDetails: UpdateTrxDto,
  ): Promise<Transaction> {
    return this.trxService.updateTrx(transcDetails.id, transcDetails);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('kyc')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update kyc' })
  async handleKYC(
    @Body() Details: KycDto,
    @Req() req: any,
    @Res() res: any,
  ): Promise<void> {
    await this.uploadService.getUploadMiddleware(
      './src/public/kyc',
      [
        { name: 'front', maxCount: 1 }, // Handle 'front'
        { name: 'back', maxCount: 1 }, // Handle 'back'
      ],
      ['png', 'jpeg', 'pdf'],
    )(req, res);

    const { id } = req.user;

    Details = {
      ...req.body,
      front: req.files?.front ? req.files.front[0].path : '', // Handle 'front'
      back: req.files?.back ? req.files.back[0].path : '', // Handle 'back'
    };

    return res.status(200).json(await this.userService.handleKYC(id, Details));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('deposit/proof')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'proof uploaded' })
  async addDepositProof(
    @Body() Details: ProofDto,
    @Req() req: any,
    @Res() res: any,
  ): Promise<void> {
    await this.uploadService.getUploadMiddleware(
      './src/public',
      [
        { name: 'file', maxCount: 1 }, // Handle 'front'
      ],
      ['png', 'jpeg', 'pdf'],
    )(req, res);

    Details = {
      ...req.body,
      file: req.files?.file ? req.files.file[0].path : '', // Handle 'file'
    };
    console.log(req.body, req.files);
    return res
      .status(200)
      .json(await this.userService.addDepositProof(Details));
  }
}
