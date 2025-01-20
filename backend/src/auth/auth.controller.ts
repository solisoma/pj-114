/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Get,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AuthConfirmEmailDto } from './dtos/auth-confirm-email.dto';
import { AuthGuard } from '@nestjs/passport';
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthForgotPasswordDto } from './dtos/auth-forgot-password.dto';
import { AuthResetPasswordDto } from './dtos/auth-reset-password.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/typeorm/entities/user.entity';
import { IAuthService } from './auth';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RefreshTokenResponseDto } from './dtos/auth-refreshtoken-response.dto';
import { StatusResponseDto } from './dtos/auth-status.dto';
import { GoogleAuthGuard } from './strategies/google-guards';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { EncryptService } from 'src/encrypt/encrypt.service';

@ApiTags('Auth')
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    private configService: ConfigService<AllConfigType>,
    private encryptService: EncryptService,
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseType> {
    return this.authService.validateLogin(loginDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 204, description: 'User registered successfully' })
  async register(@Body() createUserDto: AuthRegisterDto): Promise<void> {
    console.log('Received Register DTO:', createUserDto);
    return await this.authService.registerUser(createUserDto);
  }

  @Post('confirm-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Email confirmation' })
  @ApiResponse({ status: 204, description: 'Email confirmation successful!' })
  async confirmEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<void> {
    return this.authService.confirmEmail(confirmEmailDto.hash);
  }

  @ApiBearerAuth()
  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get the user status' })
  @ApiResponse({
    status: 200,
    description: 'User status successfully retrieved',
    type: StatusResponseDto,
  })
  public status(
    @Request() request,
  ): Promise<
    NullableType<User | { totalDeposits: number; totalWithdrawals: number }>
  > {
    return this.authService.status(request.user);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Forgot password' })
  @ApiResponse({
    status: 204,
    description: 'Forgot password email link with hash successfully sent!',
  })
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: 204,
    description: 'Password reset successfully!',
  })
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
  }

  @ApiBearerAuth()
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed!',
    type: RefreshTokenResponseDto,
  })
  public refresh(@Request() request): Promise<Omit<LoginResponseType, 'user'>> {
    return this.authService.refreshToken({
      sessionId: request.user.sessionId,
    });
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({
    status: 204,
    description: 'Logout successful!',
  })
  public async logout(@Request() request): Promise<void> {
    await this.authService.logout({
      sessionId: request.user.sessionId,
    });
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() request, @Response() response) {
    // console.log('Redirecting');
    try {
      const frontendDomain = this.configService.get<string>(
        'app.frontendDomain',
        {
          infer: true,
        },
      );
      const text = JSON.stringify({
        ttl: new Date().setSeconds(60),
        id: request.user,
      });
      const encryptedId = this.encryptService.encryptSingle(text);

      return response.redirect(
        `${frontendDomain}/dashboard?r_id=${encodeURIComponent(encryptedId)}`,
      );
    } catch (error) {
      console.error('Error hashing user:', error);
      return response.status(500).send('Internal Server Error');
    }
  }

  // @Get('google/extension/redirect')
  // async googleAuthExtensionRedirect(
  //   @Query('code') code: string,
  //   @Response() res,
  // ) {
  //   try {
  //     const userData = await this.authService.handleGoogleRedirect(code);
  //     res.json(userData);
  //   } catch (error) {
  //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       message: 'Google Authentication Failed',
  //       error: error.message,
  //     });
  //   }
  // }

  // @Get('/oauth2callback')
  // async handleOAuth2Callback(@Req() req, @Res() res) {
  //   try {
  //     const user = await this.authService.handleOAuthCallback(req.query.code);

  //     return res.status(200).json({ user });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('encrypt-token')
  @ApiOperation({ summary: 'Change Password' })
  async encryptToken(): Promise<string> {
    return this.authService.encryptToken();
  }
}
