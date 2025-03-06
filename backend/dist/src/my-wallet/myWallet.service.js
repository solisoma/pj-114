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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../typeorm/entities/user.entity");
const wallet_entity_1 = require("../typeorm/entities/wallet.entity");
let WalletService = class WalletService {
    constructor(usersRepository, walletRepository) {
        this.usersRepository = usersRepository;
        this.walletRepository = walletRepository;
    }
    async createWallet(id, createWalletDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { id },
        });
        if (!existingUser)
            throw new common_1.HttpException("User doesn't exists", common_1.HttpStatus.CONFLICT);
        if (existingUser.permission !== user_entity_1.UserPermission.Admin)
            throw new common_1.HttpException('User is not permitted to take this action', common_1.HttpStatus.CONFLICT);
        const wallet = this.walletRepository.create({
            ...createWalletDto
        });
        return await this.walletRepository.save(wallet);
    }
    async getWallet(name) {
        return await this.walletRepository.findOne({
            where: { name },
        });
    }
    async getAllWallet() {
        return await this.walletRepository.find();
    }
    async updateWallet(id, details) {
        const { id: userId, ...values } = details;
        const user = await this.usersRepository.findOne({
            where: { id },
        });
        if (user.permission !== user_entity_1.UserPermission.Admin)
            throw new common_1.HttpException('User is not permitted to take this action', common_1.HttpStatus.CONFLICT);
        const wallet = await this.walletRepository.findOne({
            where: { id: userId },
        });
        if (!wallet)
            throw new common_1.HttpException("Wallet doesn't exists", common_1.HttpStatus.CONFLICT);
        const updateWallet = { ...wallet, ...values };
        return await this.walletRepository.save(updateWallet);
    }
    async deleteWallet(userId, id) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
            });
            if (user.permission !== user_entity_1.UserPermission.Admin)
                throw new common_1.HttpException('User is not permitted to take this action', common_1.HttpStatus.CONFLICT);
            const wallet = await this.walletRepository.findOne({
                where: { id },
            });
            if (!wallet)
                throw new common_1.HttpException("Wallet doesn't exists", common_1.HttpStatus.CONFLICT);
            await this.walletRepository.softDelete(id);
            return { id, deleted: true };
        }
        catch {
            return { id, deleted: false };
        }
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(wallet_entity_1.MyWallet)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], WalletService);
//# sourceMappingURL=myWallet.service.js.map