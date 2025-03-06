"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = exports.Routes = void 0;
var Routes;
(function (Routes) {
    Routes["AUTH"] = "auth";
    Routes["TRADE"] = "trade";
    Routes["AUTH_GOOGLE"] = "auth/google";
    Routes["USERS"] = "users";
    Routes["CopyTrade"] = "copytrade";
    Routes["Plan"] = "plan";
    Routes["Wallet"] = "wallet";
    Routes["MyWallet"] = "my-wallet";
})(Routes || (exports.Routes = Routes = {}));
var Services;
(function (Services) {
    Services["AUTH"] = "AUTH_SERVICE";
    Services["AUTH_GOOGLE"] = "AUTH_GOOGLE_SERVICE";
    Services["USERS"] = "USERS_SERVICE";
    Services["SESSION"] = "SESSION_SERVICE";
    Services["MAILER"] = "MAILER_SERVICE";
    Services["MAILS"] = "MAILS_SERVICE";
    Services["FORGOT_PASSWORD"] = "FORGOT_PASSWORD_SERVICE";
})(Services || (exports.Services = Services = {}));
//# sourceMappingURL=constants.js.map