import { Country, Gender } from '@app/typeorm/entities/user.entity';
export declare class AuthRegisterDto {
    email: string;
    password: string;
    name: string;
    referral_id?: string;
    phone_number: string;
    address: string;
    country: Country;
    gender: Gender;
}
