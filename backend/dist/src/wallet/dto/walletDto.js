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
exports.UpdateWalletDto = exports.CreateWalletDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateWalletDto {
}
exports.CreateWalletDto = CreateWalletDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USDT(TRC20)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWalletDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'My wallet' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWalletDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '24467hb5yh7uhb56ey7u76jh7u8i6u979km9k7' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWalletDto.prototype, "address", void 0);
class UpdateWalletDto {
}
exports.UpdateWalletDto = UpdateWalletDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateWalletDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USDT(TRC20)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWalletDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'My wallet' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWalletDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '24467hb5yh7uhb56ey7u76jh7u8i6u979km9k7' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWalletDto.prototype, "address", void 0);
//# sourceMappingURL=walletDto.js.map