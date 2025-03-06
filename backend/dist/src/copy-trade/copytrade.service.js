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
exports.CopyTradeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const transaction_entity_1 = require("../typeorm/entities/transaction.entity");
const transaction_service_1 = require("../transaction/transaction.service");
const user_entity_1 = require("../typeorm/entities/user.entity");
const copy_trade_entity_1 = require("../typeorm/entities/copy.trade.entity");
let CopyTradeService = class CopyTradeService {
    constructor(usersRepository, copyTradeRepository, trxService) {
        this.usersRepository = usersRepository;
        this.copyTradeRepository = copyTradeRepository;
        this.trxService = trxService;
    }
    async subscribeUser(id, copyTradeDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { id },
        });
        if (!existingUser)
            throw new common_1.HttpException("User doesn't exists", common_1.HttpStatus.CONFLICT);
        if (existingUser.copytrade_balance < copyTradeDto.amount)
            throw new common_1.HttpException('Insufficient balance', common_1.HttpStatus.CONFLICT);
        existingUser.copytrade_balance -= copyTradeDto.amount;
        const copy = this.copyTradeRepository.create({
            ...copyTradeDto,
            user: { id },
        });
        await this.usersRepository.save(existingUser);
        const complete = await this.copyTradeRepository.save(copy);
        await this.trxService.createTrx(id, {
            service: 'Invested in copy trade',
            category: transaction_entity_1.Category.CopyTrade,
            amount: copyTradeDto.amount,
            status: transaction_entity_1.TrxStatus.Successful,
        });
        return complete;
    }
    async getSubscribedUser(id) {
        const users_copytrade = await this.copyTradeRepository.find({
            where: { user: { id }, expired: false },
        });
        const user = await this.usersRepository.findOne({ where: { id } });
        const validateEach = users_copytrade.filter(async (contract) => {
            if (Date.now() - new Date(contract.last_update).getTime() < 1800000)
                return true;
            const created_on = new Date(contract.created_at);
            const { roi } = contract;
            if (Date.now() >
                new Date(created_on.setDate(created_on.getDate() + contract.duration)).getTime()) {
                const shuffle = [roi, roi * 1.534, roi * 2.0073, roi * 2.5344];
                const main_roi = shuffle[Math.floor(Math.random() * shuffle.length)];
                contract.pnl = Number(((Number(contract.amount) * main_roi) / 100).toFixed(4));
                contract.expired = true;
                user.copytrade_balance += Number(contract.amount) + contract.pnl;
                await this.copyTradeRepository.save(contract);
                await this.usersRepository.save(user);
                await this.trxService.createTrx(id, {
                    service: 'move PnL to copy trade account',
                    amount: contract.pnl,
                    category: transaction_entity_1.Category.CopyTrade,
                    status: transaction_entity_1.TrxStatus.Successful,
                });
                return false;
            }
            else {
                const shuffle = [
                    roi * -1.534,
                    roi * -2.0073,
                    roi * -2.5344,
                    roi,
                    roi * 1.534,
                    roi * 2.0073,
                    roi * 2.5344,
                ];
                const main_roi = shuffle[Math.floor(Math.random() * shuffle.length)];
                contract.pnl = Number(((Number(contract.amount) * main_roi) / 100).toFixed(4));
                await this.copyTradeRepository.save(contract);
                return true;
            }
        });
        return validateEach;
    }
};
exports.CopyTradeService = CopyTradeService;
exports.CopyTradeService = CopyTradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(copy_trade_entity_1.CopyTrade)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        transaction_service_1.TransactionService])
], CopyTradeService);
//# sourceMappingURL=copytrade.service.js.map