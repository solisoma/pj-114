"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const app_config_1 = __importDefault(require("./config/app.config"));
const typeorm_config_service_1 = require("./database/typeorm-config.service");
const typeorm_2 = require("typeorm");
const database_config_1 = __importDefault(require("./config/database.config"));
const database_initializer_service_1 = require("./database/database-initializer.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const users_controller_1 = require("./users/users.controller");
const users_module_1 = require("./users/users.module");
const auth_config_1 = __importDefault(require("./config/auth.config"));
const encrypt_module_1 = require("./encrypt/encrypt.module");
const copytrade_module_1 = require("./copy-trade/copytrade.module");
const plan_module_1 = require("./plan/plan.module");
const transaction_module_1 = require("./transaction/transaction.module");
const upload_module_1 = require("./upload/upload.module");
const wallet_module_1 = require("./wallet/wallet.module");
const myWallet_module_1 = require("./my-wallet/myWallet.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, database_config_1.default, auth_config_1.default],
                envFilePath: ['.env'],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_config_service_1.TypeOrmConfigService,
                dataSourceFactory: async (options) => {
                    const dataSource = await new typeorm_2.DataSource(options).initialize();
                    return dataSource;
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            encrypt_module_1.EncryptModule,
            copytrade_module_1.CopyTradeModule,
            plan_module_1.PlanModule,
            transaction_module_1.TransactionModule,
            upload_module_1.UploadModule,
            wallet_module_1.WalletModule,
            myWallet_module_1.MyWalletModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController, users_controller_1.UsersController],
        providers: [database_initializer_service_1.DatabaseInitializerService, app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map