/* eslint-disable prettier/prettier */
import { Session } from 'src/session/entities/session.entity';
import { User } from 'src/typeorm/entities/user.entity';

export type JwtPayloadType = Pick<User, 'id'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
