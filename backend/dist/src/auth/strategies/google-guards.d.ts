import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
declare const GoogleAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleAuthGuard extends GoogleAuthGuard_base {
    private configService;
    constructor(configService: ConfigService<AllConfigType>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
