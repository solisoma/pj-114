import { DeepPartial, Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { FindOptions } from 'src/utils/types/find-options.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { ISessionService } from './session';
import { User } from 'src/typeorm/entities/user.entity';
export declare class SessionService implements ISessionService {
    private readonly sessionRepository;
    constructor(sessionRepository: Repository<Session>);
    findOne(options: FindOptions<Session>): Promise<NullableType<Session>>;
    findMany(options: FindOptions<Session>): Promise<Session[]>;
    create(data: DeepPartial<Session>): Promise<Session>;
    softDelete({ excludeId, ...criteria }: {
        id?: Session['id'];
        user?: Pick<User, 'id'>;
        excludeId?: Session['id'];
    }): Promise<void>;
}
