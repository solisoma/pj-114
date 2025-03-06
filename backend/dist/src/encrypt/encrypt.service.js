"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let EncryptService = class EncryptService {
    constructor(configService) {
        this.configService = configService;
        this.encryptKey = this.configService.get('auth.encryptKey', {
            infer: true,
        });
        this.iv = this.configService.get('auth.iv', {
            infer: true,
        });
        this.algorithm = this.configService.get('auth.algorithm', {
            infer: true,
        });
    }
    encryptSingle(text) {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.encryptKey, 'hex'), Buffer.from(this.iv, 'hex'));
        let encryptedId = cipher.update(text, 'utf8', 'hex');
        encryptedId += cipher.final('hex');
        return encryptedId;
    }
    encryptMulti(textArray) {
        for (let i = 0; i < textArray.length; i++) {
            const encrypted = this.encryptSingle(textArray[i]);
            textArray[i] = encrypted;
        }
        return textArray;
    }
    decryptSingle(hex) {
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.encryptKey, 'hex'), Buffer.from(this.iv, 'hex'));
        let decryptedId = decipher.update(hex, 'hex', 'utf8');
        decryptedId += decipher.final('utf8');
        return decryptedId;
    }
    decryptMulti(hexArray) {
        for (let i = 0; i < hexArray.length; i++) {
            const decrypted = this.decryptSingle(hexArray[i]);
            hexArray[i] = decrypted;
        }
        return hexArray;
    }
};
exports.EncryptService = EncryptService;
exports.EncryptService = EncryptService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EncryptService);
//# sourceMappingURL=encrypt.service.js.map