/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUsersService } from 'src/users/users';
import { Services } from 'src/utils/constants';
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
  ) {
    super();
  }
  
  serializeUser(user: User, done: Function) {
    console.log('Serialized User');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.usersService.findOneUser(payload.id);
    console.log('Deserialize user');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
