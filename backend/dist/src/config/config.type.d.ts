export type AppConfig = {
    nodeEnv: string;
    name: string;
    workingDirectory: string;
    frontendDomain?: string;
    backendDomain: string;
    port: number;
    apiPrefix: string;
};
export type DatabaseConfig = {
    url?: string;
    type?: string;
    host?: string;
    port?: number;
    password?: string;
    name?: string;
    username?: string;
    synchronize?: boolean;
};
export type AuthConfig = {
    secret?: string;
    expires?: string;
    refreshSecret?: string;
    refreshExpires?: string;
};
export type PaymentConfig = {
    paystackApiKey?: string;
    paystackURL?: string;
};
export type ActivateConfig = {
    saurl?: string;
    saapi?: string;
    msurl?: string;
    msapi?: string;
    loki_profit?: number;
    hermes_profit?: number;
    rubNgn?: number;
    range?: number;
};
export type MailerConfig = {
    port: number;
    host?: string;
    user?: string;
    password?: string;
    defaultEmail?: string;
    defaultName?: string;
    ignoreTLS: boolean;
    secure: boolean;
    requireTLS: boolean;
    mailGunAPIKey: string;
    mailGunDomainName: string;
    mailGunDefaultName: string;
    mailGunDefaultEmail: string;
};
export type GoogleConfig = {
    clientId?: string;
    clientSecret?: string;
    callbackURL?: string;
    clientExtensionSecret?: string;
    extensionClientId?: string;
    extensionRedirectURL?: string;
};
export type AllConfigType = {
    app: AppConfig;
    database: DatabaseConfig;
    auth: AuthConfig;
    mailer: MailerConfig;
    google: GoogleConfig;
    activate: ActivateConfig;
};
