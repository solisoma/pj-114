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
exports.SessionSerializer = void 0;
const constants_1 = require("../../utils/constants");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let SessionSerializer = class SessionSerializer extends passport_1.PassportSerializer {
    constructor(usersService) {
        super();
        this.usersService = usersService;
    }
    serializeUser(user, done) {
        console.log('Serialized User');
        done(null, user);
    }
    async deserializeUser(payload, done) {
        const user = await this.usersService.findOneUser(payload.id);
        console.log('Deserialize user');
        console.log(user);
        return user ? done(null, user) : done(null, null);
    }
};
exports.SessionSerializer = SessionSerializer;
exports.SessionSerializer = SessionSerializer = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.Services.USERS)),
    __metadata("design:paramtypes", [Object])
], SessionSerializer);
//# sourceMappingURL=serializer.js.map