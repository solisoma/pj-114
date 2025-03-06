"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceKey = exports.Currency = exports.SubscriptionExpiry = exports.SubscriptionState = exports.SubscriptionDuration = exports.SubscriptionType = void 0;
var SubscriptionType;
(function (SubscriptionType) {
    SubscriptionType["Free"] = "free";
    SubscriptionType["Standard"] = "standard";
    SubscriptionType["Premium"] = "premium";
})(SubscriptionType || (exports.SubscriptionType = SubscriptionType = {}));
var SubscriptionDuration;
(function (SubscriptionDuration) {
    SubscriptionDuration["Free"] = "free";
    SubscriptionDuration["Monthly"] = "monthly";
    SubscriptionDuration["Biannual"] = "biannual";
    SubscriptionDuration["Annual"] = "annual";
})(SubscriptionDuration || (exports.SubscriptionDuration = SubscriptionDuration = {}));
var SubscriptionState;
(function (SubscriptionState) {
    SubscriptionState["active"] = "active";
    SubscriptionState["inactive"] = "inactive";
})(SubscriptionState || (exports.SubscriptionState = SubscriptionState = {}));
var SubscriptionExpiry;
(function (SubscriptionExpiry) {
    SubscriptionExpiry[SubscriptionExpiry["monthly"] = 1] = "monthly";
    SubscriptionExpiry[SubscriptionExpiry["biannual"] = 6] = "biannual";
    SubscriptionExpiry[SubscriptionExpiry["annual"] = 12] = "annual";
})(SubscriptionExpiry || (exports.SubscriptionExpiry = SubscriptionExpiry = {}));
var Currency;
(function (Currency) {
    Currency["USD"] = "usd";
    Currency["EUR"] = "eur";
    Currency["NGN"] = "ngn";
})(Currency || (exports.Currency = Currency = {}));
var PriceKey;
(function (PriceKey) {
    PriceKey["monthly_standard"] = "app.monthly_standard";
    PriceKey["monthly_premium"] = "app.monthly_premium";
    PriceKey["biannual_standard"] = "app.biannual_standard";
    PriceKey["biannual_premium"] = "app.biannual_premium";
    PriceKey["annual_standard"] = "app.annual_standard";
    PriceKey["annual_premium"] = "app.annual_premium";
})(PriceKey || (exports.PriceKey = PriceKey = {}));
//# sourceMappingURL=subscription-type.enum.js.map