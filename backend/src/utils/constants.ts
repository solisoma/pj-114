/* eslint-disable prettier/prettier */
export enum Routes {
  AUTH = 'auth',
  TRADE = 'trade',
  AUTH_GOOGLE = 'auth/google',
  USERS = 'users',
  CopyTrade = 'copytrade',
  Plan = 'plan',
  Wallet = 'wallet',
  MyWallet = 'my-wallet',
  Chat = 'chat',
}

export enum Services {
  AUTH = 'AUTH_SERVICE',
  AUTH_GOOGLE = 'AUTH_GOOGLE_SERVICE',
  USERS = 'USERS_SERVICE',
  SESSION = 'SESSION_SERVICE',
  MAILER = 'MAILER_SERVICE',
  MAILS = 'MAILS_SERVICE',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD_SERVICE',
}

export const Cors = {
  prodCor: ['https://nobleassetmarkets.com', 'https://quantureinc.netlify.app'],
  devCor: ['http://localhost:3002'],
};
