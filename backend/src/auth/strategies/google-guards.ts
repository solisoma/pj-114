/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService<AllConfigType>) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      const activate = (await super.canActivate(context)) as boolean;
      if (activate) await super.logIn(request);
      return activate;
    } catch (err) {
      const frontendDomain = this.configService.get<string>(
        'app.frontendDomain',
        {
          infer: true,
        },
      );
      response.redirect(`${frontendDomain}/account/sign-in?r_id=0`);
      return false;
    }
  }
}
