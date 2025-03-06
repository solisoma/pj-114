"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const constants_1 = require("../utils/constants");
const users_module_1 = require("../users/users.module");
const session_module_1 = require("../session/session.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const jwt_refresh_strategy_1 = require("./strategies/jwt-refresh.strategy");
const anonymous_strategy_1 = require("./strategies/anonymous.strategy");
const forgot_password_module_1 = require("../forgot-password/forgot-password.module");
const serializer_1 = require("./strategies/serializer");
const encrypt_module_1 = require("../encrypt/encrypt.module");
const transaction_entity_1 = require("../typeorm/entities/transaction.entity");
const typeorm_1 = require("@nestjs/typeorm");
const referral_entity_1 = require("../typeorm/entities/referral.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            session_module_1.SessionModule,
            passport_1.PassportModule.register({ session: true }),
            forgot_password_module_1.ForgotPasswordModule,
            jwt_1.JwtModule.register({}),
            encrypt_module_1.EncryptModule,
            typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.Transaction, referral_entity_1.Referral]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            jwt_strategy_1.JwtStrategy,
            anonymous_strategy_1.AnonymousStrategy,
            serializer_1.SessionSerializer,
            {
                provide: constants_1.Services.AUTH,
                useClass: auth_service_1.AuthService,
            },
            {
                provide: constants_1.Services.AUTH_GOOGLE,
                useClass: auth_service_1.AuthService,
            },
        ],
        exports: [
            {
                provide: constants_1.Services.AUTH,
                useClass: auth_service_1.AuthService,
            },
            {
                provide: constants_1.Services.AUTH_GOOGLE,
                useClass: auth_service_1.AuthService,
            },
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map