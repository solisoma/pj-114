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
exports.AuthRegisterDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const lower_case_transformer_1 = require("../../utils/transformers/lower-case.transformer");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../typeorm/entities/user.entity");
class AuthRegisterDto {
}
exports.AuthRegisterDto = AuthRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uferegoodnews@gmail.com' }),
    (0, class_transformer_1.Transform)(lower_case_transformer_1.lowerCaseTransformer),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ufere Goodnews' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ufere Goodnews' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "referral_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ufere Goodnews' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '234 Ava street' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USA' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(user_entity_1.Country),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Male' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(user_entity_1.Gender),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "gender", void 0);
//# sourceMappingURL=auth-register.dto.js.map