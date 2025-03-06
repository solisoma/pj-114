"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../typeorm/entities/user.entity");
const constants_1 = require("../utils/constants");
const transaction_entity_1 = require("../typeorm/entities/transaction.entity");
const transaction_module_1 = require("../transaction/transaction.module");
const upload_module_1 = require("../upload/upload.module");
const referral_entity_1 = require("../typeorm/entities/referral.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, transaction_entity_1.Transaction, referral_entity_1.Referral]),
            transaction_module_1.TransactionModule,
            upload_module_1.UploadModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            {
                provide: constants_1.Services.USERS,
                useClass: users_service_1.UsersService,
            },
        ],
        exports: [
            users_service_1.UsersService,
            typeorm_1.TypeOrmModule,
            {
                provide: constants_1.Services.USERS,
                useClass: users_service_1.UsersService,
            },
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map