import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AuthConfirmEmailDto } from './dtos/auth-confirm-email.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthForgotPasswordDto } from './dtos/auth-forgot-password.dto';
import { AuthResetPasswordDto } from './dtos/auth-reset-password.dto';
import { User } from 'src/typeorm/entities/user.entity';
import { IAuthService } from './auth';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { EncryptService } from 'src/encrypt/encrypt.service';
export declare class AuthController {
    private configService;
    private encryptService;
    private readonly authService;
    constructor(configService: ConfigService<AllConfigType>, encryptService: EncryptService, authService: IAuthService);
    login(loginDto: AuthEmailLoginDto): Promise<LoginResponseType>;
    register(createUserDto: AuthRegisterDto): Promise<void>;
    confirmEmail(confirmEmailDto: AuthConfirmEmailDto): Promise<void>;
    status(request: any): Promise<NullableType<User | {
        totalDeposits: number;
        totalWithdrawals: number;
    }>>;
    forgotPassword(forgotPasswordDto: AuthForgotPasswordDto): Promise<void>;
    resetPassword(resetPasswordDto: AuthResetPasswordDto): Promise<void>;
    refresh(request: any): Promise<Omit<LoginResponseType, 'user'>>;
    logout(request: any): Promise<void>;
    handleGoogleLogin(): {
        msg: string;
    };
    googleAuthRedirect(request: any, response: any): Promise<any>;
    encryptToken(): Promise<string>;
}
