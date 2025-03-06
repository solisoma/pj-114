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
exports.User = exports.UserPermission = exports.Country = exports.Gender = exports.UserStatus = void 0;
const helpers_1 = require("../../utils/helpers");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const auth_providers_enum_1 = require("../../auth/enums/auth-providers.enum");
const transaction_entity_1 = require("./transaction.entity");
const copy_trade_entity_1 = require("./copy.trade.entity");
const plan_entity_1 = require("./plan.entity");
const bank_account_entity_1 = require("./bank.account.entity");
var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "active";
    UserStatus["Inactive"] = "inactive";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var Country;
(function (Country) {
    Country["Afghanistan"] = "Afghanistan";
    Country["Albania"] = "Albania";
    Country["Algeria"] = "Algeria";
    Country["Andorra"] = "Andorra";
    Country["Angola"] = "Angola";
    Country["AntiguaAndBarbuda"] = "Antigua and Barbuda";
    Country["Argentina"] = "Argentina";
    Country["Armenia"] = "Armenia";
    Country["Australia"] = "Australia";
    Country["Austria"] = "Austria";
    Country["Azerbaijan"] = "Azerbaijan";
    Country["Bahamas"] = "Bahamas";
    Country["Bahrain"] = "Bahrain";
    Country["Bangladesh"] = "Bangladesh";
    Country["Barbados"] = "Barbados";
    Country["Belarus"] = "Belarus";
    Country["Belgium"] = "Belgium";
    Country["Belize"] = "Belize";
    Country["Benin"] = "Benin";
    Country["Bhutan"] = "Bhutan";
    Country["Bolivia"] = "Bolivia";
    Country["BosniaAndHerzegovina"] = "Bosnia and Herzegovina";
    Country["Botswana"] = "Botswana";
    Country["Brazil"] = "Brazil";
    Country["Brunei"] = "Brunei";
    Country["Bulgaria"] = "Bulgaria";
    Country["BurkinaFaso"] = "Burkina Faso";
    Country["Burundi"] = "Burundi";
    Country["Cambodia"] = "Cambodia";
    Country["Cameroon"] = "Cameroon";
    Country["Canada"] = "Canada";
    Country["CapeVerde"] = "Cape Verde";
    Country["CentralAfricanRepublic"] = "Central African Republic";
    Country["Chad"] = "Chad";
    Country["Chile"] = "Chile";
    Country["China"] = "China";
    Country["Colombia"] = "Colombia";
    Country["Comoros"] = "Comoros";
    Country["CongoDR"] = "Congo (DR)";
    Country["CostaRica"] = "Costa Rica";
    Country["Croatia"] = "Croatia";
    Country["Cuba"] = "Cuba";
    Country["Cyprus"] = "Cyprus";
    Country["CzechRepublic"] = "Czech Republic";
    Country["Denmark"] = "Denmark";
    Country["Djibouti"] = "Djibouti";
    Country["Dominica"] = "Dominica";
    Country["DominicanRepublic"] = "Dominican Republic";
    Country["EastTimor"] = "East Timor";
    Country["Ecuador"] = "Ecuador";
    Country["Egypt"] = "Egypt";
    Country["ElSalvador"] = "El Salvador";
    Country["EquatorialGuinea"] = "Equatorial Guinea";
    Country["Eritrea"] = "Eritrea";
    Country["Estonia"] = "Estonia";
    Country["Eswatini"] = "Eswatini";
    Country["Ethiopia"] = "Ethiopia";
    Country["Fiji"] = "Fiji";
    Country["Finland"] = "Finland";
    Country["France"] = "France";
    Country["Gabon"] = "Gabon";
    Country["Gambia"] = "Gambia";
    Country["Georgia"] = "Georgia";
    Country["Germany"] = "Germany";
    Country["Ghana"] = "Ghana";
    Country["Greece"] = "Greece";
    Country["Grenada"] = "Grenada";
    Country["Guatemala"] = "Guatemala";
    Country["Guinea"] = "Guinea";
    Country["GuineaBissau"] = "Guinea-Bissau";
    Country["Guyana"] = "Guyana";
    Country["Haiti"] = "Haiti";
    Country["Honduras"] = "Honduras";
    Country["Hungary"] = "Hungary";
    Country["Iceland"] = "Iceland";
    Country["India"] = "India";
    Country["Indonesia"] = "Indonesia";
    Country["Iran"] = "Iran";
    Country["Iraq"] = "Iraq";
    Country["Ireland"] = "Ireland";
    Country["Israel"] = "Israel";
    Country["Italy"] = "Italy";
    Country["IvoryCoast"] = "Ivory Coast";
    Country["Jamaica"] = "Jamaica";
    Country["Japan"] = "Japan";
    Country["Jordan"] = "Jordan";
    Country["Kazakhstan"] = "Kazakhstan";
    Country["Kenya"] = "Kenya";
    Country["Kiribati"] = "Kiribati";
    Country["KoreaNorth"] = "Korea (North)";
    Country["KoreaSouth"] = "Korea (South)";
    Country["Kosovo"] = "Kosovo";
    Country["Kuwait"] = "Kuwait";
    Country["Kyrgyzstan"] = "Kyrgyzstan";
    Country["Laos"] = "Laos";
    Country["Latvia"] = "Latvia";
    Country["Lebanon"] = "Lebanon";
    Country["Lesotho"] = "Lesotho";
    Country["Liberia"] = "Liberia";
    Country["Libya"] = "Libya";
    Country["Liechtenstein"] = "Liechtenstein";
    Country["Lithuania"] = "Lithuania";
    Country["Luxembourg"] = "Luxembourg";
    Country["Madagascar"] = "Madagascar";
    Country["Malawi"] = "Malawi";
    Country["Malaysia"] = "Malaysia";
    Country["Maldives"] = "Maldives";
    Country["Mali"] = "Mali";
    Country["Malta"] = "Malta";
    Country["MarshallIslands"] = "Marshall Islands";
    Country["Mauritania"] = "Mauritania";
    Country["Mauritius"] = "Mauritius";
    Country["Mexico"] = "Mexico";
    Country["Micronesia"] = "Micronesia";
    Country["Moldova"] = "Moldova";
    Country["Monaco"] = "Monaco";
    Country["Mongolia"] = "Mongolia";
    Country["Montenegro"] = "Montenegro";
    Country["Morocco"] = "Morocco";
    Country["Mozambique"] = "Mozambique";
    Country["Myanmar"] = "Myanmar";
    Country["Namibia"] = "Namibia";
    Country["Nauru"] = "Nauru";
    Country["Nepal"] = "Nepal";
    Country["Netherlands"] = "Netherlands";
    Country["NewZealand"] = "New Zealand";
    Country["Nicaragua"] = "Nicaragua";
    Country["Niger"] = "Niger";
    Country["Nigeria"] = "Nigeria";
    Country["NorthMacedonia"] = "North Macedonia";
    Country["Norway"] = "Norway";
    Country["Oman"] = "Oman";
    Country["Pakistan"] = "Pakistan";
    Country["Palau"] = "Palau";
    Country["Palestine"] = "Palestine";
    Country["Panama"] = "Panama";
    Country["PapuaNewGuinea"] = "Papua New Guinea";
    Country["Paraguay"] = "Paraguay";
    Country["Peru"] = "Peru";
    Country["Philippines"] = "Philippines";
    Country["Poland"] = "Poland";
    Country["Portugal"] = "Portugal";
    Country["Qatar"] = "Qatar";
    Country["Romania"] = "Romania";
    Country["Russia"] = "Russia";
    Country["Rwanda"] = "Rwanda";
    Country["SaintKittsAndNevis"] = "Saint Kitts and Nevis";
    Country["SaintLucia"] = "Saint Lucia";
    Country["SaintVincentAndTheGrenadines"] = "Saint Vincent and the Grenadines";
    Country["Samoa"] = "Samoa";
    Country["SanMarino"] = "San Marino";
    Country["SaoTomeAndPrincipe"] = "Sao Tome and Principe";
    Country["SaudiArabia"] = "Saudi Arabia";
    Country["Senegal"] = "Senegal";
    Country["Serbia"] = "Serbia";
    Country["Seychelles"] = "Seychelles";
    Country["SierraLeone"] = "Sierra Leone";
    Country["Singapore"] = "Singapore";
    Country["Slovakia"] = "Slovakia";
    Country["Slovenia"] = "Slovenia";
    Country["SolomonIslands"] = "Solomon Islands";
    Country["Somalia"] = "Somalia";
    Country["SouthAfrica"] = "South Africa";
    Country["SouthSudan"] = "South Sudan";
    Country["Spain"] = "Spain";
    Country["SriLanka"] = "Sri Lanka";
    Country["Sudan"] = "Sudan";
    Country["Suriname"] = "Suriname";
    Country["Sweden"] = "Sweden";
    Country["Switzerland"] = "Switzerland";
    Country["Syria"] = "Syria";
    Country["Taiwan"] = "Taiwan";
    Country["Tajikistan"] = "Tajikistan";
    Country["Tanzania"] = "Tanzania";
    Country["Thailand"] = "Thailand";
    Country["Togo"] = "Togo";
    Country["Tonga"] = "Tonga";
    Country["TrinidadAndTobago"] = "Trinidad and Tobago";
    Country["Tunisia"] = "Tunisia";
    Country["Turkey"] = "Turkey";
    Country["Turkmenistan"] = "Turkmenistan";
    Country["Tuvalu"] = "Tuvalu";
    Country["Uganda"] = "Uganda";
    Country["Ukraine"] = "Ukraine";
    Country["UnitedArabEmirates"] = "United Arab Emirates";
    Country["UnitedKingdom"] = "United Kingdom";
    Country["UnitedStates"] = "United States";
    Country["Uruguay"] = "Uruguay";
    Country["Uzbekistan"] = "Uzbekistan";
    Country["Vanuatu"] = "Vanuatu";
    Country["VaticanCity"] = "Vatican City";
    Country["Venezuela"] = "Venezuela";
    Country["Vietnam"] = "Vietnam";
    Country["Yemen"] = "Yemen";
    Country["Zambia"] = "Zambia";
    Country["Zimbabwe"] = "Zimbabwe";
})(Country || (exports.Country = Country = {}));
var UserPermission;
(function (UserPermission) {
    UserPermission["Admin"] = "admin";
    UserPermission["User"] = "user";
})(UserPermission || (exports.UserPermission = UserPermission = {}));
let User = class User {
    loadPreviousPassword() {
        this.previousPassword = this.password;
    }
    async hashPasswordBeforeInsert() {
        await this.hashPassword();
    }
    async hashPasswordBeforeUpdate() {
        if (this.password !== this.previousPassword) {
            await this.hashPassword();
        }
    }
    async hashPassword() {
        if (this.password && !this.isPasswordHashed(this.password)) {
            console.log(`Hashing password: ${this.password}`);
            this.password = await (0, helpers_1.hashPassword)(this.password);
            console.log(`Hashed password: ${this.password}`);
        }
    }
    isPasswordHashed(password) {
        return password.startsWith('$2a$') || password.startsWith('$2b$');
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "previousPassword", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "loadPreviousPassword", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPasswordBeforeInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPasswordBeforeUpdate", null);
__decorate([
    (0, typeorm_1.Column)({ default: auth_providers_enum_1.AuthProvidersEnum.email }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UserStatus, default: UserStatus.Active }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserPermission,
        default: UserPermission.User,
    }),
    __metadata("design:type", String)
], User.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    (0, typeorm_1.Index)(),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "copytrade_balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "plan_balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "referral_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "front_image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "back_image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Gender }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Country }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (transaction) => transaction.user, {
        cascade: true,
    }),
    __metadata("design:type", transaction_entity_1.Transaction)
], User.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plan_entity_1.Plan, (plan) => plan.user, {
        cascade: true,
    }),
    __metadata("design:type", plan_entity_1.Plan)
], User.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => copy_trade_entity_1.CopyTrade, (copytrade) => copytrade.user, {
        cascade: true,
    }),
    __metadata("design:type", copy_trade_entity_1.CopyTrade)
], User.prototype, "copytrade", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bank_account_entity_1.CryptoWallet, (wallet) => wallet.user, {
        cascade: true,
    }),
    __metadata("design:type", bank_account_entity_1.CryptoWallet)
], User.prototype, "crypto_wallet", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map