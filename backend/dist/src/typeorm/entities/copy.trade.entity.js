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
exports.CopyTrade = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let CopyTrade = class CopyTrade {
};
exports.CopyTrade = CopyTrade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CopyTrade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.transactions, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], CopyTrade.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Number)
], CopyTrade.prototype, "roi", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 4 }),
    __metadata("design:type", Number)
], CopyTrade.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], CopyTrade.prototype, "pnl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number }),
    __metadata("design:type", Number)
], CopyTrade.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], CopyTrade.prototype, "expired", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CopyTrade.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], CopyTrade.prototype, "last_update", void 0);
exports.CopyTrade = CopyTrade = __decorate([
    (0, typeorm_1.Entity)()
], CopyTrade);
//# sourceMappingURL=copy.trade.entity.js.map