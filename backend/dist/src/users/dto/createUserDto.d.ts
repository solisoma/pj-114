import { AuthProvidersEnum } from 'src/auth/enums/auth-providers.enum';
import { Country, Gender, UserStatus } from 'src/typeorm/entities/user.entity';
export declare class CreateUserDto {
    name: string;
    email: string | null;
    phone_number: string;
    address: string;
    gender: Gender;
    country: Country;
    password?: string;
    provider?: AuthProvidersEnum;
    status?: UserStatus;
    socialId?: string | null;
    referral_id?: string;
    hash?: string | null;
}
