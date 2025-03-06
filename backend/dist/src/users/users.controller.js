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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../utils/constants");
const passport_1 = require("@nestjs/passport");
const changePasswordDto_1 = require("./dto/changePasswordDto");
const user_general_dto_1 = require("./dto/user.general.dto");
const transactionDto_1 = require("../transaction/dto/transactionDto");
const transaction_service_1 = require("../transaction/transaction.service");
const upload_service_1 = require("../upload/upload.service");
let UsersController = class UsersController {
    constructor(userService, trxService, uploadService) {
        this.userService = userService;
        this.trxService = trxService;
        this.uploadService = uploadService;
    }
    async changePassword(changePasswordDto, req) {
        const userId = req.user.id;
        return this.userService.changePassword(userId, changePasswordDto);
    }
    async changeUserStatus(userDetail, req) {
        const userId = req.user.id;
        return this.userService.adminChangeUserStatus(userId, userDetail);
    }
    async getUser(param) {
        return this.userService.findOneUser({ id: Number(param.userId) });
    }
    async getTrx(param, req) {
        const id = param.userId || req.user.id;
        return this.userService.getTrx(Number(id), param.category);
    }
    async getReferrals(req) {
        const id = req.user.id;
        return this.userService.getRefferrals(Number(id));
    }
    async getUsers(req) {
        const { user: { id }, } = req;
        return this.userService.getAllUser(id);
    }
    async updateBalance(transcDetails, req) {
        const userId = req.user.id;
        return this.userService.updateBalance(userId, transcDetails);
    }
    async transfer(transcDetails, req) {
        const userId = req.user.id;
        return this.userService.transfer(userId, transcDetails);
    }
    async withdraw(transcDetails, req) {
        const userId = req.user.id;
        return this.userService.withdraw(userId, transcDetails);
    }
    async deposit(transcDetails, req) {
        const userId = req.user.id;
        return this.userService.deposit(userId, transcDetails);
    }
    async updateTrxStatus(transcDetails) {
        return this.trxService.updateTrx(transcDetails.id, transcDetails);
    }
    async handleKYC(Details, req, res) {
        await this.uploadService.getUploadMiddleware('./src/public/kyc', [
            { name: 'front', maxCount: 1 },
            { name: 'back', maxCount: 1 },
        ], ['png', 'jpeg', 'pdf'])(req, res);
        const { id } = req.user;
        Details = {
            ...req.body,
            front: req.files?.front ? req.files.front[0].path : '',
            back: req.files?.back ? req.files.back[0].path : '',
        };
        return res.status(200).json(await this.userService.handleKYC(id, Details));
    }
    async addDepositProof(Details, req, res) {
        await this.uploadService.getUploadMiddleware('./src/public', [
            { name: 'file', maxCount: 1 },
        ], ['png', 'jpeg', 'pdf'])(req, res);
        Details = {
            ...req.body,
            file: req.files?.file ? req.files.file[0].path : '',
        };
        console.log(req.body, req.files);
        return res
            .status(200)
            .json(await this.userService.addDepositProof(Details));
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('change-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Change Password' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Password successfully changed!',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [changePasswordDto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('change-user-status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Change user status' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Status successfully changed!',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.adminChangeUserStatusDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeUserStatus", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('get-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'User fetched successfully',
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('get-trx'),
    (0, swagger_1.ApiOperation)({ summary: 'Get transaction' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Transactions fetched successfully',
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.IdDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getTrx", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('referrals'),
    (0, swagger_1.ApiOperation)({ summary: 'Get referrals' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Referrals fetched successfully',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getReferrals", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('all-users'),
    (0, swagger_1.ApiOperation)({ summary: 'Get users' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Users fetched successfully',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('update-balance'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Update balance' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Balance updated successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.transcDetailsDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateBalance", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('transfer'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'transfer' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Balance updated successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.TransferDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "transfer", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('withdraw'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update balance' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Balance updated successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.DepositDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "withdraw", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('deposit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update balance' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Balance updated successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.DepositDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deposit", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('update/trx'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update balance' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Balance updated successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactionDto_1.UpdateTrxDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateTrxStatus", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('kyc'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update kyc' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.KycDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "handleKYC", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('deposit/proof'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'proof uploaded' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_general_dto_1.ProofDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addDepositProof", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)(constants_1.Routes.USERS),
    __param(0, (0, common_1.Inject)(constants_1.Services.USERS)),
    __metadata("design:paramtypes", [Object, transaction_service_1.TransactionService,
        upload_service_1.UploadService])
], UsersController);
//# sourceMappingURL=users.controller.js.map