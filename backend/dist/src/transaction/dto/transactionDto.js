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
exports.UpdateTrxDto = exports.CreateTrxDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const transaction_entity_1 = require("../../typeorm/entities/transaction.entity");
class CreateTrxDto {
}
exports.CreateTrxDto = CreateTrxDto;
__decorate([
    (0, class_validator_1.IsEnum)(transaction_entity_1.Category),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTrxDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTrxDto.prototype, "service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateTrxDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTrxDto.prototype, "walletAddress", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(transaction_entity_1.TrxStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTrxDto.prototype, "status", void 0);
class UpdateTrxDto {
}
exports.UpdateTrxDto = UpdateTrxDto;
__decorate([
    (0, class_validator_1.IsEnum)(transaction_entity_1.TrxStatus),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTrxDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateTrxDto.prototype, "id", void 0);
//# sourceMappingURL=transactionDto.js.map