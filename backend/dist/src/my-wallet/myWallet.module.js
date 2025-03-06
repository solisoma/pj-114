"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWalletModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../typeorm/entities/user.entity");
const myWallet_controller_1 = require("./myWallet.controller");
const myWallet_service_1 = require("./myWallet.service");
const upload_module_1 = require("../upload/upload.module");
const wallet_entity_1 = require("../typeorm/entities/wallet.entity");
let MyWalletModule = class MyWalletModule {
};
exports.MyWalletModule = MyWalletModule;
exports.MyWalletModule = MyWalletModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, wallet_entity_1.MyWallet]), upload_module_1.UploadModule],
        controllers: [myWallet_controller_1.WalletController],
        providers: [myWallet_service_1.WalletService],
        exports: [myWallet_service_1.WalletService],
    })
], MyWalletModule);
//# sourceMappingURL=myWallet.module.js.map