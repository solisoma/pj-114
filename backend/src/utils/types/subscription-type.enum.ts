/* eslint-disable prettier/prettier */

export enum SubscriptionType {
  Free = 'free',
  Standard = 'standard',
  Premium = 'premium',
}

export enum SubscriptionDuration {
  Free = 'free',
  Monthly = 'monthly',
  Biannual = 'biannual',
  Annual = 'annual',
}

export enum SubscriptionState {
  active = 'active',
  inactive = 'inactive',
}

export enum SubscriptionExpiry {
  monthly = 1,
  biannual = 6,
  annual = 12,
}

export enum Currency {
  USD = 'usd',
  EUR = 'eur',
  NGN = 'ngn',
}

export enum PriceKey {
  monthly_standard = 'app.monthly_standard',
  monthly_premium = 'app.monthly_premium',
  biannual_standard = 'app.biannual_standard',
  biannual_premium = 'app.biannual_premium',
  annual_standard = 'app.annual_standard',
  annual_premium = 'app.annual_premium',
}
