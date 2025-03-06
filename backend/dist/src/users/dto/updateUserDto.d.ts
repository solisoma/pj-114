import { Country, Gender } from '@app/typeorm/entities/user.entity';
export declare class UpdateUserDto {
    name?: string;
    email?: string | null;
    password?: string;
    picture?: string | null;
    phone_number: string;
    address: string;
    gender: Gender;
    country: Country;
    paymentStatus?: string;
}
