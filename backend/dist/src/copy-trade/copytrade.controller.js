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
exports.CopyTradeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../utils/constants");
const passport_1 = require("@nestjs/passport");
const copyTradeDto_1 = require("./dto/copyTradeDto");
const copytrade_service_1 = require("./copytrade.service");
let CopyTradeController = class CopyTradeController {
    constructor(copyTradeService) {
        this.copyTradeService = copyTradeService;
    }
    async subscribeUser(copyTradeDto, req) {
        const userId = req.user.id;
        return this.copyTradeService.subscribeUser(userId, copyTradeDto);
    }
    async changeUserStatus(req) {
        const userId = req.user.id;
        return this.copyTradeService.getSubscribedUser(userId);
    }
};
exports.CopyTradeController = CopyTradeController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('subscribe'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Subscribe user' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'User subscribed successfully',
    }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [copyTradeDto_1.CopyTradeDto, Object]),
    __metadata("design:returntype", Promise)
], CopyTradeController.prototype, "subscribeUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Trades fetched successfully',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CopyTradeController.prototype, "changeUserStatus", null);
exports.CopyTradeController = CopyTradeController = __decorate([
    (0, swagger_1.ApiTags)('CopyTrade'),
    (0, common_1.Controller)(constants_1.Routes.CopyTrade),
    __metadata("design:paramtypes", [copytrade_service_1.CopyTradeService])
], CopyTradeController);
//# sourceMappingURL=copytrade.controller.js.map