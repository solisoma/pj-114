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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoWallet = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let CryptoWallet = class CryptoWallet {
};
exports.CryptoWallet = CryptoWallet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CryptoWallet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.transactions, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], CryptoWallet.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], CryptoWallet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true }),
    __metadata("design:type", String)
], CryptoWallet.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], CryptoWallet.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CryptoWallet.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], CryptoWallet.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], CryptoWallet.prototype, "deleted_at", void 0);
exports.CryptoWallet = CryptoWallet = __decorate([
    (0, typeorm_1.Entity)()
], CryptoWallet);
//# sourceMappingURL=bank.account.entity.js.map