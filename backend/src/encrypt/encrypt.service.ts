/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptService {
  encryptKey: string;
  iv: string;
  algorithm: string;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.encryptKey = this.configService.get<string>('auth.encryptKey', {
      infer: true,
    });
    this.iv = this.configService.get<string>('auth.iv', {
      infer: true,
    });
    this.algorithm = this.configService.get<string>('auth.algorithm', {
      infer: true,
    });
  }

  encryptSingle(text: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.encryptKey, 'hex'),
      Buffer.from(this.iv, 'hex'),
    );

    let encryptedId = cipher.update(text, 'utf8', 'hex');
    encryptedId += cipher.final('hex');

    return encryptedId;
  }

  encryptMulti(textArray: string[]): string[] {
    for (let i = 0; i < textArray.length; i++) {
      const encrypted = this.encryptSingle(textArray[i]);
      textArray[i] = encrypted;
    }
    return textArray;
  }

  decryptSingle(hex: string): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.encryptKey, 'hex'),
      Buffer.from(this.iv, 'hex'),
    );

    let decryptedId = decipher.update(hex, 'hex', 'utf8');
    decryptedId += decipher.final('utf8');

    return decryptedId;
  }

  decryptMulti(hexArray: string[]): string[] {
    for (let i = 0; i < hexArray.length; i++) {
      const decrypted = this.decryptSingle(hexArray[i]);
      hexArray[i] = decrypted;
    }
    return hexArray;
  }
}
