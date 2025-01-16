/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { AuthProvidersEnum } from './enums/auth-providers.enum';
import * as crypto from 'crypto';
import { ISessionService } from 'src/session/session';
import { Session } from 'src/session/entities/session.entity';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from './auth';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { compareHash, hashPassword } from 'src/utils/helpers';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IForgotPasswordService } from 'src/forgot-password/forgot-password';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { User, UserStatus } from 'src/typeorm/entities/user.entity';
import { IUsersService } from 'src/users/users';
import { addHours } from 'date-fns';
import axios from 'axios';
import { EncryptService } from 'src/encrypt/encrypt.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
    @Inject(Services.SESSION) private readonly sessionService: ISessionService,
    @Inject(Services.FORGOT_PASSWORD)
    private readonly forgotPasswordService: IForgotPasswordService,
    private readonly encryptService: EncryptService,

    private readonly configService: ConfigService<AllConfigType>,
    private readonly jwtService: JwtService,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseType> {
    const user = await this.usersService.findOneUser({
      email: loginDto.email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'notFound',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (
      user.status === UserStatus.Inactive &&
      user.activationExpiry &&
      user.activationExpiry < new Date()
    ) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          errors: {
            account: 'expired',
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: `needLoginViaProvider:${user.provider}`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await compareHash(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const session = await this.sessionService.create({
      user,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      sessionId: session.id,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  async handleOAuthCallback(code: string): Promise<LoginResponseType> {
    try {
      const tokenUrl = 'https://oauth2.googleapis.com/token';
      const clientId = this.configService.getOrThrow<string>(
        'google.extensionClientId',
        {
          infer: true,
        },
      );
      const clientSecret = this.configService.getOrThrow<string>(
        'google.clientExtensionSecret',
        {
          infer: true,
        },
      );
      const redirectUri = this.configService.getOrThrow<string>(
        'google.extensionRedirectURL',
        {
          infer: true,
        },
      );

      const tokenResponse = await axios.post(tokenUrl, {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      });

      const { access_token } = tokenResponse.data;

      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const profile = userInfo.data;

      let user = await this.usersService.findOneUser({
        socialId: profile.id,
        provider: AuthProvidersEnum.google,
      });

      if (!user) {
        user = await this.usersService.createUser({
          email: profile.email,
          name: profile.name,
          socialId: profile.id,
          provider: AuthProvidersEnum.google,
          status: UserStatus.Active,
          picture: profile.picture,
        });
      }

      const session = await this.sessionService.create({
        user,
      });

      const { token, refreshToken, tokenExpires } = await this.getTokensData({
        id: user.id,
        sessionId: session.id,
      });

      return {
        refreshToken,
        token,
        tokenExpires,
        user,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to authenticate via Google',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registerUser(registerDto: AuthRegisterDto): Promise<void> {
    console.log('Register DTO:', registerDto);
    const userExist = await this.usersService.findOneUser({
      email: registerDto.email,
    });
    if (userExist)
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const hashedPassword = await hashPassword(registerDto.password);

    const activationExpiry = addHours(new Date(), 24);

    console.log('Activation Expiry:', activationExpiry);

    await this.usersService.createUser({
      ...registerDto,
      password: hashedPassword,
      email: registerDto.email,
      status: UserStatus.Active,
      hash,
      activationExpiry,
    });
  }

  async status(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return await this.usersService.findOneUser({
      id: userJwtPayload.id,
    });
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersService.findOneUser({
      hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    user.hash = null;
    user.status = UserStatus.Active;
    await this.usersService.saveUser(user);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOneUser({
      email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
    await this.forgotPasswordService.create({
      hash,
      user,
    });
  }

  async resetPassword(hash: string, password: string): Promise<void> {
    const forgotReq = await this.forgotPasswordService.findOne({
      where: {
        hash,
      },
    });

    if (!forgotReq) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = forgotReq.user;
    user.password = password;

    await this.sessionService.softDelete({
      user: {
        id: user.id,
      },
    });
    await this.usersService.saveUser(user);
    await this.forgotPasswordService.softDelete(forgotReq.id);
  }

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId'>,
  ): Promise<Omit<LoginResponseType, 'user'>> {
    const session = await this.sessionService.findOne({
      where: {
        id: data.sessionId,
      },
    });

    if (!session) {
      throw new UnauthorizedException();
    }

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      sessionId: session.id,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.softDelete({
      id: data.sessionId,
    });
  }

  async encryptToken(): Promise<string> {
    const text = JSON.stringify({
      ttl: new Date().setSeconds(60),
    });

    const encryptedId = this.encryptService.encryptSingle(text);

    return encryptedId;
  }

  private async getTokensData(data: {
    id: User['id'];
    sessionId: Session['id'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow<string>(
      'auth.expires',
      {
        infer: true,
      },
    );

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow<string>('auth.secret', {
            infer: true,
          }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow<string>('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow<string>(
            'auth.refreshExpires',
            {
              infer: true,
            },
          ),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
