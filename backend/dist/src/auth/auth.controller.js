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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const auth_email_login_dto_1 = require("./dtos/auth-email-login.dto");
const auth_register_dto_1 = require("./dtos/auth-register.dto");
const auth_confirm_email_dto_1 = require("./dtos/auth-confirm-email.dto");
const passport_1 = require("@nestjs/passport");
const auth_forgot_password_dto_1 = require("./dtos/auth-forgot-password.dto");
const auth_reset_password_dto_1 = require("./dtos/auth-reset-password.dto");
const swagger_1 = require("@nestjs/swagger");
const login_response_dto_1 = require("./dtos/login-response.dto");
const auth_refreshtoken_response_dto_1 = require("./dtos/auth-refreshtoken-response.dto");
const auth_status_dto_1 = require("./dtos/auth-status.dto");
const google_guards_1 = require("./strategies/google-guards");
const config_1 = require("@nestjs/config");
const encrypt_service_1 = require("../encrypt/encrypt.service");
let AuthController = class AuthController {
    constructor(configService, encryptService, authService) {
        this.configService = configService;
        this.encryptService = encryptService;
        this.authService = authService;
    }
    login(loginDto) {
        return this.authService.validateLogin(loginDto);
    }
    async register(createUserDto) {
        console.log('Received Register DTO:', createUserDto);
        return await this.authService.registerUser(createUserDto);
    }
    async confirmEmail(confirmEmailDto) {
        return this.authService.confirmEmail(confirmEmailDto.hash);
    }
    status(request) {
        return this.authService.status(request.user);
    }
    async forgotPassword(forgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }
    resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto.hash, resetPasswordDto.password);
    }
    refresh(request) {
        return this.authService.refreshToken({
            sessionId: request.user.sessionId,
        });
    }
    async logout(request) {
        await this.authService.logout({
            sessionId: request.user.sessionId,
        });
    }
    handleGoogleLogin() {
        return { msg: 'Google Authentication' };
    }
    async googleAuthRedirect(request, response) {
        try {
            const frontendDomain = this.configService.get('app.frontendDomain', {
                infer: true,
            });
            const text = JSON.stringify({
                ttl: new Date().setSeconds(60),
                id: request.user,
            });
            const encryptedId = this.encryptService.encryptSingle(text);
            return response.redirect(`${frontendDomain}/dashboard?r_id=${encodeURIComponent(encryptedId)}`);
        }
        catch (error) {
            console.error('Error hashing user:', error);
            return response.status(500).send('Internal Server Error');
        }
    }
    async encryptToken() {
        return this.authService.encryptToken();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login with email and password' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successful login',
        type: login_response_dto_1.LoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_email_login_dto_1.AuthEmailLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'User registered successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_register_dto_1.AuthRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('confirm-email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Email confirmation' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Email confirmation successful!' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_confirm_email_dto_1.AuthConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmEmail", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get the user status' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User status successfully retrieved',
        type: auth_status_dto_1.StatusResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "status", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Forgot password' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Forgot password email link with hash successfully sent!',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forgot_password_dto_1.AuthForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Password reset successfully!',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_reset_password_dto_1.AuthResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-refresh')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh Token' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token successfully refreshed!',
        type: auth_refreshtoken_response_dto_1.RefreshTokenResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Logout' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Logout successful!',
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)(google_guards_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "handleGoogleLogin", null);
__decorate([
    (0, common_1.Get)('google/redirect'),
    (0, common_1.UseGuards)(google_guards_1.GoogleAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('encrypt-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Change Password' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "encryptToken", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)(constants_1.Routes.AUTH),
    __param(2, (0, common_1.Inject)(constants_1.Services.AUTH)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        encrypt_service_1.EncryptService, Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map