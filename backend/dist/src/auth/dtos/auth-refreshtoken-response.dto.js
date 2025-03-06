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
exports.RefreshTokenResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RefreshTokenResponseDto {
}
exports.RefreshTokenResponseDto = RefreshTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOjcsImlhdCI6MTcxNjIwMTYzMSwiZXhwIjoxNzE2Mjg4MDMxfQ.epeKCgIWbehjeCSm8BW3tG1P9K3qgTdm3QSEEZJ0BwQ',
    }),
    __metadata("design:type", String)
], RefreshTokenResponseDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic2Vzc2lvbklkIjo3LCJpYXQiOjE3MTYyMDE2MzEsImV4cCI6MTcxNjI4ODAzMX0.xQRtDAmMqL3SBO1fYlJ0N18TdCzGwoVA7YXX_40Bpio',
    }),
    __metadata("design:type", String)
], RefreshTokenResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1716288031411,
    }),
    __metadata("design:type", Number)
], RefreshTokenResponseDto.prototype, "tokenExpires", void 0);
//# sourceMappingURL=auth-refreshtoken-response.dto.js.map