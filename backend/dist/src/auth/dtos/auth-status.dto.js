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
exports.StatusResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StatusResponseDto {
}
exports.StatusResponseDto = StatusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
    }),
    __metadata("design:type", Number)
], StatusResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ufere Kalu',
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'dekalusha@gmail.com',
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '$2a$10$eyWJ.YyD55h3htmUOVLEteFovyOEM6goCwV93rErVdaQhB/rwQAju',
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'email',
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'active',
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "socialId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-05-20T00:01:54.840Z',
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "hash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-05-20T10:23:28.000Z',
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: null,
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "picture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '$2a$10$eyWJ.YyD55h3htmUOVLEteFovyOEM6goCwV93rErVdaQhB/rwQAju',
    }),
    __metadata("design:type", String)
], StatusResponseDto.prototype, "previousPassword", void 0);
//# sourceMappingURL=auth-status.dto.js.map