import { User } from 'src/typeorm/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
export declare class ForgotPassword extends EntityHelper {
    id: number;
    hash: string;
    user: User;
    createdAt: Date;
    deletedAt: Date;
}
