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
exports.ProofDto = exports.KycDto = exports.DepositDto = exports.TransferDto = exports.UserDto = exports.IdDto = exports.transcDetailsDto = exports.adminChangeUserStatusDto = exports.Directions = exports.TrxCategory = exports.Actions = void 0;
const class_validator_1 = require("class-validator");
var Actions;
(function (Actions) {
    Actions["Suspend"] = "suspend";
    Actions["Activate"] = "activate";
    Actions["Delete"] = "delete";
    Actions["ToAdmin"] = "to-admin";
    Actions["ToUser"] = "to-user";
    Actions["Verify"] = "verify";
    Actions["NotVerify"] = "not-verify";
})(Actions || (exports.Actions = Actions = {}));
var TrxCategory;
(function (TrxCategory) {
    TrxCategory["All"] = "all";
    TrxCategory["Withdrawal"] = "withdrawal";
    TrxCategory["Deposit"] = "deposit";
})(TrxCategory || (exports.TrxCategory = TrxCategory = {}));
var Directions;
(function (Directions) {
    Directions["Send"] = "send";
    Directions["Receive"] = "receive";
})(Directions || (exports.Directions = Directions = {}));
class adminChangeUserStatusDto {
}
exports.adminChangeUserStatusDto = adminChangeUserStatusDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], adminChangeUserStatusDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Actions),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], adminChangeUserStatusDto.prototype, "action", void 0);
class transcDetailsDto {
}
exports.transcDetailsDto = transcDetailsDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], transcDetailsDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], transcDetailsDto.prototype, "pnl", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], transcDetailsDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Directions),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], transcDetailsDto.prototype, "direction", void 0);
class IdDto {
}
exports.IdDto = IdDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], IdDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(TrxCategory),
    __metadata("design:type", String)
], IdDto.prototype, "category", void 0);
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "userId", void 0);
class TransferDto {
}
exports.TransferDto = TransferDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TransferDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TransferDto.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TransferDto.prototype, "amount", void 0);
class DepositDto {
}
exports.DepositDto = DepositDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], DepositDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DepositDto.prototype, "walletAddress", void 0);
class KycDto {
}
exports.KycDto = KycDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KycDto.prototype, "front", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KycDto.prototype, "back", void 0);
class ProofDto {
}
exports.ProofDto = ProofDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProofDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProofDto.prototype, "file", void 0);
//# sourceMappingURL=user.general.dto.js.map