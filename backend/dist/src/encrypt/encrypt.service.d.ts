import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
export declare class EncryptService {
    private readonly configService;
    encryptKey: string;
    iv: string;
    algorithm: string;
    constructor(configService: ConfigService<AllConfigType>);
    encryptSingle(text: string): string;
    encryptMulti(textArray: string[]): string[];
    decryptSingle(hex: string): string;
    decryptMulti(hexArray: string[]): string[];
}
