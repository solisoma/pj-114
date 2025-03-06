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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../typeorm/entities/user.entity");
const helpers_1 = require("../utils/helpers");
const user_general_dto_1 = require("./dto/user.general.dto");
const transaction_entity_1 = require("../typeorm/entities/transaction.entity");
const transaction_service_1 = require("../transaction/transaction.service");
const referral_entity_1 = require("../typeorm/entities/referral.entity");
let UsersService = class UsersService {
    constructor(usersRepository, trxRepository, refRepository, trxService) {
        this.usersRepository = usersRepository;
        this.trxRepository = trxRepository;
        this.refRepository = refRepository;
        this.trxService = trxService;
    }
    async createUser(createUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser)
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
        const user = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(user);
    }
    async findOneUser(options) {
        const user = await this.usersRepository.findOne({
            where: options,
        });
        return user;
    }
    async getAllUser(id) {
        const currentUser = await this.usersRepository.findOne({ where: { id } });
        if (currentUser.permission === user_entity_1.UserPermission.User)
            throw new common_1.HttpException('Not allowed', common_1.HttpStatus.FORBIDDEN);
        return await this.usersRepository.find({
            select: ['id', 'name', 'email'],
        });
    }
    findUsersWithPagination(paginationOptions) {
        return this.usersRepository.find({
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
            take: paginationOptions.limit,
        });
    }
    async updateUser(id, payload) {
        const restrictedFields = ['provider', 'status', 'hash', 'socialId'];
        for (const field of restrictedFields) {
            if (field in payload) {
                delete payload[field];
            }
        }
        if (payload.password) {
            payload.password = await (0, helpers_1.hashPassword)(payload.password);
        }
        await this.usersRepository.update(id, payload);
        const updatedUser = await this.usersRepository.findOne({ where: { id } });
        if (!updatedUser) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return updatedUser;
    }
    async deleteUser(id) {
        await this.usersRepository.softDelete(id);
    }
    async saveUser(user) {
        return this.usersRepository.save(user);
    }
    async adminChangeUserStatus(id, userDetail) {
        const { action, userId } = userDetail;
        const isUser = await this.usersRepository.findOne({ where: { id } });
        const objectUser = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!isUser || !objectUser)
            throw new common_1.HttpException("One of the user doesn't exist", common_1.HttpStatus.NOT_FOUND);
        if (isUser.permission === user_entity_1.UserPermission.User)
            throw new common_1.HttpException("User doesn't have the permission", common_1.HttpStatus.UNAUTHORIZED);
        switch (action) {
            case user_general_dto_1.Actions.Delete:
                if (isUser.permission === user_entity_1.UserPermission.Admin) {
                    await this.usersRepository.delete(userId);
                }
                else {
                    throw new common_1.HttpException("User doesn't have the permission", common_1.HttpStatus.UNAUTHORIZED);
                }
                break;
            case user_general_dto_1.Actions.Verify:
                if (isUser.permission === user_entity_1.UserPermission.Admin) {
                    await this.usersRepository.update(userId, { isVerified: true });
                }
                else {
                    throw new common_1.HttpException("User doesn't have the permission", common_1.HttpStatus.UNAUTHORIZED);
                }
                break;
            case user_general_dto_1.Actions.NotVerify:
                if (isUser.permission === user_entity_1.UserPermission.Admin) {
                    await this.usersRepository.update(userId, { isVerified: false });
                }
                else {
                    throw new common_1.HttpException("User doesn't have the permission", common_1.HttpStatus.UNAUTHORIZED);
                }
                break;
            case user_general_dto_1.Actions.ToAdmin:
                if (isUser.permission === user_entity_1.UserPermission.Admin) {
                    await this.usersRepository.update(userId, {
                        permission: user_entity_1.UserPermission.Admin,
                    });
                }
                else {
                    throw new common_1.HttpException("User doesn't have the permission", common_1.HttpStatus.UNAUTHORIZED);
                }
                break;
            case user_general_dto_1.Actions.ToUser:
                if (isUser.permission === user_entity_1.UserPermission.Admin) {
                    await this.usersRepository.update(userId, {
                        permission: user_entity_1.UserPermission.User,
                    });
                }
                else {
                    throw new common_1.HttpException("User doesn't have the permission", common_1.HttpStatus.UNAUTHORIZED);
                }
                break;
        }
    }
    async updateBalance(id, transcDetails) {
        const { amount, userId, direction } = transcDetails;
        const isUser = await this.usersRepository.findOne({ where: { id } });
        const objectUser = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!isUser || !objectUser)
            throw new common_1.HttpException("One of the user doesn't exist", common_1.HttpStatus.NOT_FOUND);
        let newBalance;
        switch (direction) {
            case user_general_dto_1.Directions.Send:
                newBalance = objectUser.balance - amount;
                await this.usersRepository.update(userId, { balance: newBalance });
                if (transcDetails.pnl)
                    await this.trxService.createTrx(userId, {
                        service: `Loss`,
                        amount,
                        status: transaction_entity_1.TrxStatus.Successful,
                        category: transaction_entity_1.Category.PNL,
                    });
                break;
            case user_general_dto_1.Directions.Receive:
                if (isUser.permission === user_entity_1.UserPermission.Admin) {
                    newBalance = Number(objectUser.balance) + Number(amount);
                    await this.usersRepository.update(userId, {
                        balance: newBalance,
                    });
                    if (transcDetails.pnl)
                        await this.trxService.createTrx(userId, {
                            service: `Profit`,
                            amount,
                            status: transaction_entity_1.TrxStatus.Successful,
                            category: transaction_entity_1.Category.PNL,
                        });
                }
                else {
                    throw new common_1.HttpException("User doesn't have the permission", common_1.HttpStatus.UNAUTHORIZED);
                }
        }
    }
    async addDepositProof(proof) {
        const { id, file } = proof;
        const trx = await this.trxRepository.findOne({ where: { id } });
        if (!trx)
            throw new common_1.HttpException('Transaction not found', common_1.HttpStatus.NOT_FOUND);
        trx.proof = file;
        this.trxRepository.save(trx);
    }
    async handleKYC(id, details) {
        const user = await this.usersRepository.findOne({ where: { id } });
        user.front_image = details.front;
        user.back_image = details.back;
        await this.usersRepository.save(user);
    }
    async deposit(id, details) {
        const { amount } = details;
        return await this.trxService.createTrx(id, {
            service: 'Deposit',
            category: transaction_entity_1.Category.Deposit,
            amount,
        });
    }
    async withdraw(id, details) {
        const { amount } = details;
        return await this.trxService.createTrx(id, {
            service: 'Withdrawal',
            category: transaction_entity_1.Category.Withdrawal,
            amount,
        });
    }
    async transfer(id, trxDetails) {
        const user = await this.usersRepository.findOne({ where: { id } });
        const { from, to, amount } = trxDetails;
        const keys = ['balance', 'copytrade_balance', 'plan_balance'];
        if (!keys.includes(from))
            throw new common_1.HttpException(`Wrong value for field "from" must be one of this values ${String(keys)}`, common_1.HttpStatus.CONFLICT);
        if (!keys.includes(to))
            throw new common_1.HttpException(`Wrong value for field "to" must be one of this values ${String(keys)}`, common_1.HttpStatus.CONFLICT);
        if (from === to)
            throw new common_1.HttpException("from and to can't be same value", common_1.HttpStatus.CONFLICT);
        if (user[from] >= amount) {
            user[from] = Number(user[from]) - Number(amount);
            user[to] = Number(user[to]) + Number(amount);
            this.usersRepository.save(user);
            return;
        }
        throw new common_1.HttpException('Insufficient funds', common_1.HttpStatus.CONFLICT);
    }
    async getTrx(id, category) {
        const isUser = await this.usersRepository.findOne({ where: { id } });
        if (!isUser)
            throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.NOT_FOUND);
        if (category === user_general_dto_1.TrxCategory.All)
            return await this.trxRepository.find({
                where: { user: { id } },
                order: { id: 'DESC' },
            });
        if (category === user_general_dto_1.TrxCategory.Deposit)
            return await this.trxRepository.find({
                where: { user: { id }, category: transaction_entity_1.Category.Deposit },
                order: { id: 'DESC' },
            });
        return await this.trxRepository.find({
            where: { user: { id }, category: transaction_entity_1.Category.Withdrawal },
            order: { id: 'DESC' },
        });
    }
    async changePassword(id, changePasswordDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { id },
        });
        if (!existingUser)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        const isValidPassword = await (0, helpers_1.compareHash)(changePasswordDto.currentPassword, existingUser.password);
        if (!isValidPassword) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: 'incorrectCurrentPassword',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword)
            throw new common_1.HttpException('Confirm password does not match new password', common_1.HttpStatus.BAD_REQUEST);
        const hashedPassword = await (0, helpers_1.hashPassword)(changePasswordDto.newPassword);
        const user = {
            ...existingUser,
            password: hashedPassword,
        };
        await this.usersRepository.save(user);
    }
    async getRefferrals(id) {
        return await this.refRepository
            .createQueryBuilder('ref')
            .leftJoinAndSelect('ref.host', 'host')
            .select(['ref', 'host.name'])
            .where('ref.userId = :id', { id })
            .orderBy('ref.id', 'DESC')
            .getMany();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(transaction_entity_1.Transaction)),
    __param(2, (0, typeorm_2.InjectRepository)(referral_entity_1.Referral)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        transaction_service_1.TransactionService])
], UsersService);
//# sourceMappingURL=users.service.js.map