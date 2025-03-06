import { User } from 'src/typeorm/entities/user.entity';
export declare class LoginResponseDto {
    refreshToken: string;
    token: string;
    tokenExpires: number;
    user: User;
}
