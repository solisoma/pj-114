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
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const transaction_entity_1 = require("../typeorm/entities/transaction.entity");
const transaction_service_1 = require("../transaction/transaction.service");
const user_entity_1 = require("../typeorm/entities/user.entity");
const plan_entity_1 = require("../typeorm/entities/plan.entity");
let PlanService = class PlanService {
    constructor(usersRepository, planRepository, trxService) {
        this.usersRepository = usersRepository;
        this.planRepository = planRepository;
        this.trxService = trxService;
    }
    async subscribeUser(id, planDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { id },
        });
        if (!existingUser)
            throw new common_1.HttpException("User doesn't exists", common_1.HttpStatus.CONFLICT);
        if (existingUser.plan_balance < planDto.amount)
            throw new common_1.HttpException('Insufficient balance', common_1.HttpStatus.CONFLICT);
        existingUser.plan_balance -= planDto.amount;
        const plan = this.planRepository.create({
            ...planDto,
            user: { id },
        });
        await this.usersRepository.save(existingUser);
        const complete = await this.planRepository.save(plan);
        await this.trxService.createTrx(id, {
            service: 'Invested in plans',
            category: transaction_entity_1.Category.Plan,
            amount: planDto.amount,
            status: transaction_entity_1.TrxStatus.Successful,
        });
        return complete;
    }
    async getSubscribedUser(id) {
        const users_plan = await this.planRepository.find({
            where: { user: { id }, expired: false },
            order: { created_at: 'DESC' }
        });
        const user = await this.usersRepository.findOne({ where: { id } });
        const validateEach = users_plan.filter(async (contract) => {
            const created_on = new Date(contract.created_at);
            const { roi } = contract;
            if (Date.now() >
                new Date(created_on.setDate(created_on.getDate() + contract.duration)).getTime()) {
                const pnl = contract.amount + (contract.amount * roi) / 100;
                contract.expired = true;
                user.plan_balance += pnl;
                await this.planRepository.save(contract);
                await this.usersRepository.save(user);
                await this.trxService.createTrx(id, {
                    service: 'move PnL to plan account',
                    amount: pnl,
                    category: transaction_entity_1.Category.Plan,
                    status: transaction_entity_1.TrxStatus.Successful,
                });
                return false;
            }
            return true;
        });
        return validateEach;
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(plan_entity_1.Plan)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        transaction_service_1.TransactionService])
], PlanService);
//# sourceMappingURL=plan.service.js.map