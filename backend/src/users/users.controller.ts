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
  IdDto,
  transcDetailsDto,
} from './dto/user.general.dto';
import { NullableType } from '@app/utils/types/nullable.type';
import { User } from '@app/typeorm/entities/user.entity';
import { Transaction } from '@app/typeorm/entities/transaction.entity';

@ApiTags('User')
@Controller(Routes.USERS)
export class UsersController {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUsersService,
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
    @Query(new ValidationPipe()) param: IdDto,
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
  ): Promise<Transaction[]> {
    return this.userService.getTrx(Number(param.userId));
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
}
