"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../utils/constants");
const passport_1 = require("@nestjs/passport");
const myWallet_service_1 = require("./myWallet.service");
const myWalletDto_1 = require("./dto/myWalletDto");
const upload_service_1 = require("../upload/upload.service");
let WalletController = class WalletController {
    constructor(walletService, uploadService) {
        this.walletService = walletService;
        this.uploadService = uploadService;
    }
    async createUser(createWalletDto, req, res) {
        await this.uploadService.getUploadMiddleware('./src/public/qrcode', [
            { name: 'qrcode', maxCount: 1 },
        ], ['png', 'jpeg', 'pdf'])(req, res);
        const { id } = req.user;
        createWalletDto = {
            ...req.body,
            qrcode: req.files?.qrcode ? req.files.qrcode[0].path : '',
        };
        return res
            .status(200)
            .json(await this.walletService.createWallet(id, createWalletDto));
    }
    async getWallet(param) {
        return this.walletService.getWallet(param.name);
    }
    async getAllWallet() {
        return this.walletService.getAllWallet();
    }
    async updateWallet(updateWallet, req, res) {
        await this.uploadService.getUploadMiddleware('./src/public/qrcode', [
            { name: 'qrcode', maxCount: 1 },
        ], ['png', 'jpeg', 'pdf'])(req, res);
        const { id } = req.user;
        updateWallet = {
            ...req.body,
            qrcode: req.files?.qrcode ? req.files.qrcode[0].path : '',
        };
        return res
            .status(200)
            .json(await this.walletService.updateWallet(id, updateWallet));
    }
    async deleteWallet(id, req) {
        const { d: userId } = req.user;
        return this.walletService.deleteWallet(userId, id);
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'create wallet' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'User subscribed successfully',
    }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [myWalletDto_1.CreateWalletDto, Object, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'wallets fetched successfully',
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [myWalletDto_1.GetWalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'wallets fetched successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getAllWallet", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'wallets updated successfully',
    }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [myWalletDto_1.UpdateWalletDto, Object, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "updateWallet", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'wallets deleted successfully',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "deleteWallet", null);
exports.WalletController = WalletController = __decorate([
    (0, swagger_1.ApiTags)('My Wallet'),
    (0, common_1.Controller)(constants_1.Routes.MyWallet),
    __metadata("design:paramtypes", [myWallet_service_1.WalletService,
        upload_service_1.UploadService])
], WalletController);
//# sourceMappingURL=myWallet.controller.js.map