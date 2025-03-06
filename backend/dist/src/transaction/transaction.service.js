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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../typeorm/entities/user.entity");
const transaction_entity_1 = require("../typeorm/entities/transaction.entity");
let TransactionService = class TransactionService {
    constructor(trxRepository, usersRepository) {
        this.trxRepository = trxRepository;
        this.usersRepository = usersRepository;
    }
    async createTrx(id, createTrxDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { id },
        });
        if (!existingUser)
            throw new common_1.HttpException("User doesn't exists", common_1.HttpStatus.CONFLICT);
        const trx = this.trxRepository.create({ ...createTrxDto, user: { id } });
        return this.trxRepository.save(trx);
    }
    async updateTrx(id, updateTrxDto) {
        const existingTrx = await this.trxRepository.findOne({
            where: { id },
        });
        if (!existingTrx)
            throw new common_1.HttpException("Transaction doesn't exists", common_1.HttpStatus.CONFLICT);
        await this.trxRepository.update(id, updateTrxDto);
        return await this.trxRepository.findOne({
            where: { id },
        });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map