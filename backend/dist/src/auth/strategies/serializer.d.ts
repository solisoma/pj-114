import { IUsersService } from 'src/users/users';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm/entities/user.entity';
export declare class SessionSerializer extends PassportSerializer {
    private readonly usersService;
    constructor(usersService: IUsersService);
    serializeUser(user: User, done: Function): void;
    deserializeUser(payload: any, done: Function): Promise<any>;
}
