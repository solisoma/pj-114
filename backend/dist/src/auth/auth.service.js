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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const auth_providers_enum_1 = require("./enums/auth-providers.enum");
const crypto = __importStar(require("crypto"));
const config_1 = require("@nestjs/config");
const ms_1 = __importDefault(require("ms"));
const jwt_1 = require("@nestjs/jwt");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const helpers_1 = require("../utils/helpers");
const user_entity_1 = require("../typeorm/entities/user.entity");
const date_fns_1 = require("date-fns");
const encrypt_service_1 = require("../encrypt/encrypt.service");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_entity_1 = require("../typeorm/entities/transaction.entity");
const typeorm_2 = require("typeorm");
const referral_entity_1 = require("../typeorm/entities/referral.entity");
let AuthService = class AuthService {
    constructor(trxRepository, refRepository, usersService, sessionService, forgotPasswordService, encryptService, configService, jwtService) {
        this.trxRepository = trxRepository;
        this.refRepository = refRepository;
        this.usersService = usersService;
        this.sessionService = sessionService;
        this.forgotPasswordService = forgotPasswordService;
        this.encryptService = encryptService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async validateLogin(loginDto) {
        const user = await this.usersService.findOneUser({
            email: loginDto.email,
        });
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'notFound',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (user.provider !== auth_providers_enum_1.AuthProvidersEnum.email) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: `needLoginViaProvider:${user.provider}`,
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const isValidPassword = await (0, helpers_1.compareHash)(loginDto.password, user.password);
        if (!isValidPassword) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: 'incorrectPassword',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const session = await this.sessionService.create({
            user,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: user.id,
            sessionId: session.id,
        });
        return {
            refreshToken,
            token,
            tokenExpires,
            user,
        };
    }
    async registerUser(registerDto) {
        console.log('Register DTO:', registerDto);
        const userExist = await this.usersService.findOneUser({
            email: registerDto.email,
        });
        if (userExist)
            throw new common_1.HttpException('Email already registered', common_1.HttpStatus.CONFLICT);
        const hash = crypto
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const hashedPassword = await (0, helpers_1.hashPassword)(registerDto.password);
        const activationExpiry = (0, date_fns_1.addHours)(new Date(), 24);
        console.log('Activation Expiry:', activationExpiry);
        const newUser = await this.usersService.createUser({
            ...registerDto,
            password: hashedPassword,
            email: registerDto.email,
            status: user_entity_1.UserStatus.Active,
            hash,
            referral_id: crypto.randomBytes(4).toString('hex'),
        });
        if (registerDto.referral_id) {
            const owner = await this.usersService.findOneUser({
                referral_id: registerDto.referral_id,
            });
            if (owner) {
                const ref = this.refRepository.create({
                    profit: 10,
                    host: { id: newUser.id },
                    user: { id: owner.id },
                });
                owner.balance = Number(owner.balance) + 10;
                this.usersService.saveUser(owner);
                this.refRepository.save(ref);
            }
        }
    }
    async status(userJwtPayload) {
        const user = await this.usersService.findOneUser({
            id: userJwtPayload.id,
        });
        const totalWithdrawals = (await this.trxRepository.find({
            where: {
                user: { id: userJwtPayload.id },
                category: transaction_entity_1.Category.Withdrawal,
                status: transaction_entity_1.TrxStatus.Successful,
            },
        }))
            .map((itm) => itm.amount)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const totalDeposits = (await this.trxRepository.find({
            where: {
                user: { id: userJwtPayload.id },
                category: transaction_entity_1.Category.Deposit,
                status: transaction_entity_1.TrxStatus.Successful,
            },
        }))
            .map((itm) => itm.amount)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const referralBonus = (await this.refRepository.find({
            where: { user: { id: userJwtPayload.id } },
        }))
            .map((itm) => itm.profit)
            .reduce((a, b) => Number(a) + Number(b), 0);
        const newUser = { ...user, totalDeposits, totalWithdrawals, referralBonus };
        return newUser;
    }
    async confirmEmail(hash) {
        const user = await this.usersService.findOneUser({
            hash,
        });
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `notFound`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        user.hash = null;
        user.status = user_entity_1.UserStatus.Active;
        await this.usersService.saveUser(user);
    }
    async forgotPassword(email) {
        const user = await this.usersService.findOneUser({
            email,
        });
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                errors: {
                    email: 'emailNotExists',
                },
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const hash = crypto
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        await this.forgotPasswordService.create({
            hash,
            user,
        });
    }
    async resetPassword(hash, password) {
        const forgotReq = await this.forgotPasswordService.findOne({
            where: {
                hash,
            },
        });
        if (!forgotReq) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: `notFound`,
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const user = forgotReq.user;
        user.password = password;
        await this.sessionService.softDelete({
            user: {
                id: user.id,
            },
        });
        await this.usersService.saveUser(user);
        await this.forgotPasswordService.softDelete(forgotReq.id);
    }
    async refreshToken(data) {
        const session = await this.sessionService.findOne({
            where: {
                id: data.sessionId,
            },
        });
        if (!session) {
            throw new common_1.UnauthorizedException();
        }
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: session.user.id,
            sessionId: session.id,
        });
        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
    async logout(data) {
        return this.sessionService.softDelete({
            id: data.sessionId,
        });
    }
    async encryptToken() {
        const text = JSON.stringify({
            ttl: new Date().setSeconds(60),
        });
        const encryptedId = this.encryptService.encryptSingle(text);
        return encryptedId;
    }
    async getTokensData(data) {
        const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
            infer: true,
        });
        const tokenExpires = Date.now() + (0, ms_1.default)(tokenExpiresIn);
        const [token, refreshToken] = await Promise.all([
            await this.jwtService.signAsync({
                id: data.id,
                sessionId: data.sessionId,
            }, {
                secret: this.configService.getOrThrow('auth.secret', {
                    infer: true,
                }),
                expiresIn: tokenExpiresIn,
            }),
            await this.jwtService.signAsync({
                sessionId: data.sessionId,
            }, {
                secret: this.configService.getOrThrow('auth.refreshSecret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
                    infer: true,
                }),
            }),
        ]);
        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(referral_entity_1.Referral)),
    __param(2, (0, common_1.Inject)(constants_1.Services.USERS)),
    __param(3, (0, common_1.Inject)(constants_1.Services.SESSION)),
    __param(4, (0, common_1.Inject)(constants_1.Services.FORGOT_PASSWORD)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, Object, Object, encrypt_service_1.EncryptService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map