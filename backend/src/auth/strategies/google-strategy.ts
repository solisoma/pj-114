// /* eslint-disable prettier/prettier */
// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy } from 'passport-google-oauth20';
// import { AllConfigType } from 'src/config/config.type';
// import { Services } from '@app/utils/constants';
// import { IAuthService } from '../auth';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private configService: ConfigService<AllConfigType>,
//     @Inject(Services.AUTH_GOOGLE) private readonly authService: IAuthService,
//   ) {
//     super({
//       clientID: configService.get<string>('google.clientId', {
//         infer: true,
//       }),
//       clientSecret: configService.get<string>('google.clientSecret', {
//         infer: true,
//       }),
//       callbackURL: configService.get<string>('google.callbackURL', {
//         infer: true,
//       }),
//       scope: ['profile', 'email'],
//     });
//   }

//   // async validate(accessToken: string, refreshToken: string, profile: Profile) {
//   //   console.log(accessToken);
//   //   console.log(refreshToken);
//   //   console.log(profile);

//   //   const user = await this.authService.validateSocialLogin(
//   //     AuthProvidersEnum.google,
//   //     {
//   //       id: profile.id,
//   //       name: profile.displayName,
//   //       email: profile.emails[0].value,
//   //       picture: profile.photos[0].value,
//   //     },
//   //   );
//   //   console.log('Validate');
//   //   console.log(user);
//   //   return user || null;
//   // }
// }
