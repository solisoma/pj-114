/* eslint-disable prettier/prettier */
import { hashPassword } from 'src/utils/helpers';
import { Exclude } from 'class-transformer';
import { Length } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { AuthProvidersEnum } from 'src/auth/enums/auth-providers.enum';
import { Transaction } from './transaction.entity';
import { CopyTrade } from './copy.trade.entity';
import { Plan } from './plan.entity';
import { CryptoWallet } from './bank.account.entity';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum Country {
  Afghanistan = 'Afghanistan',
  Albania = 'Albania',
  Algeria = 'Algeria',
  Andorra = 'Andorra',
  Angola = 'Angola',
  AntiguaAndBarbuda = 'Antigua and Barbuda',
  Argentina = 'Argentina',
  Armenia = 'Armenia',
  Australia = 'Australia',
  Austria = 'Austria',
  Azerbaijan = 'Azerbaijan',
  Bahamas = 'Bahamas',
  Bahrain = 'Bahrain',
  Bangladesh = 'Bangladesh',
  Barbados = 'Barbados',
  Belarus = 'Belarus',
  Belgium = 'Belgium',
  Belize = 'Belize',
  Benin = 'Benin',
  Bhutan = 'Bhutan',
  Bolivia = 'Bolivia',
  BosniaAndHerzegovina = 'Bosnia and Herzegovina',
  Botswana = 'Botswana',
  Brazil = 'Brazil',
  Brunei = 'Brunei',
  Bulgaria = 'Bulgaria',
  BurkinaFaso = 'Burkina Faso',
  Burundi = 'Burundi',
  Cambodia = 'Cambodia',
  Cameroon = 'Cameroon',
  Canada = 'Canada',
  CapeVerde = 'Cape Verde',
  CentralAfricanRepublic = 'Central African Republic',
  Chad = 'Chad',
  Chile = 'Chile',
  China = 'China',
  Colombia = 'Colombia',
  Comoros = 'Comoros',
  CongoDR = 'Congo (DR)',
  CostaRica = 'Costa Rica',
  Croatia = 'Croatia',
  Cuba = 'Cuba',
  Cyprus = 'Cyprus',
  CzechRepublic = 'Czech Republic',
  Denmark = 'Denmark',
  Djibouti = 'Djibouti',
  Dominica = 'Dominica',
  DominicanRepublic = 'Dominican Republic',
  EastTimor = 'East Timor',
  Ecuador = 'Ecuador',
  Egypt = 'Egypt',
  ElSalvador = 'El Salvador',
  EquatorialGuinea = 'Equatorial Guinea',
  Eritrea = 'Eritrea',
  Estonia = 'Estonia',
  Eswatini = 'Eswatini',
  Ethiopia = 'Ethiopia',
  Fiji = 'Fiji',
  Finland = 'Finland',
  France = 'France',
  Gabon = 'Gabon',
  Gambia = 'Gambia',
  Georgia = 'Georgia',
  Germany = 'Germany',
  Ghana = 'Ghana',
  Greece = 'Greece',
  Grenada = 'Grenada',
  Guatemala = 'Guatemala',
  Guinea = 'Guinea',
  GuineaBissau = 'Guinea-Bissau',
  Guyana = 'Guyana',
  Haiti = 'Haiti',
  Honduras = 'Honduras',
  Hungary = 'Hungary',
  Iceland = 'Iceland',
  India = 'India',
  Indonesia = 'Indonesia',
  Iran = 'Iran',
  Iraq = 'Iraq',
  Ireland = 'Ireland',
  Israel = 'Israel',
  Italy = 'Italy',
  IvoryCoast = 'Ivory Coast',
  Jamaica = 'Jamaica',
  Japan = 'Japan',
  Jordan = 'Jordan',
  Kazakhstan = 'Kazakhstan',
  Kenya = 'Kenya',
  Kiribati = 'Kiribati',
  KoreaNorth = 'Korea (North)',
  KoreaSouth = 'Korea (South)',
  Kosovo = 'Kosovo',
  Kuwait = 'Kuwait',
  Kyrgyzstan = 'Kyrgyzstan',
  Laos = 'Laos',
  Latvia = 'Latvia',
  Lebanon = 'Lebanon',
  Lesotho = 'Lesotho',
  Liberia = 'Liberia',
  Libya = 'Libya',
  Liechtenstein = 'Liechtenstein',
  Lithuania = 'Lithuania',
  Luxembourg = 'Luxembourg',
  Madagascar = 'Madagascar',
  Malawi = 'Malawi',
  Malaysia = 'Malaysia',
  Maldives = 'Maldives',
  Mali = 'Mali',
  Malta = 'Malta',
  MarshallIslands = 'Marshall Islands',
  Mauritania = 'Mauritania',
  Mauritius = 'Mauritius',
  Mexico = 'Mexico',
  Micronesia = 'Micronesia',
  Moldova = 'Moldova',
  Monaco = 'Monaco',
  Mongolia = 'Mongolia',
  Montenegro = 'Montenegro',
  Morocco = 'Morocco',
  Mozambique = 'Mozambique',
  Myanmar = 'Myanmar',
  Namibia = 'Namibia',
  Nauru = 'Nauru',
  Nepal = 'Nepal',
  Netherlands = 'Netherlands',
  NewZealand = 'New Zealand',
  Nicaragua = 'Nicaragua',
  Niger = 'Niger',
  Nigeria = 'Nigeria',
  NorthMacedonia = 'North Macedonia',
  Norway = 'Norway',
  Oman = 'Oman',
  Pakistan = 'Pakistan',
  Palau = 'Palau',
  Palestine = 'Palestine',
  Panama = 'Panama',
  PapuaNewGuinea = 'Papua New Guinea',
  Paraguay = 'Paraguay',
  Peru = 'Peru',
  Philippines = 'Philippines',
  Poland = 'Poland',
  Portugal = 'Portugal',
  Qatar = 'Qatar',
  Romania = 'Romania',
  Russia = 'Russia',
  Rwanda = 'Rwanda',
  SaintKittsAndNevis = 'Saint Kitts and Nevis',
  SaintLucia = 'Saint Lucia',
  SaintVincentAndTheGrenadines = 'Saint Vincent and the Grenadines',
  Samoa = 'Samoa',
  SanMarino = 'San Marino',
  SaoTomeAndPrincipe = 'Sao Tome and Principe',
  SaudiArabia = 'Saudi Arabia',
  Senegal = 'Senegal',
  Serbia = 'Serbia',
  Seychelles = 'Seychelles',
  SierraLeone = 'Sierra Leone',
  Singapore = 'Singapore',
  Slovakia = 'Slovakia',
  Slovenia = 'Slovenia',
  SolomonIslands = 'Solomon Islands',
  Somalia = 'Somalia',
  SouthAfrica = 'South Africa',
  SouthSudan = 'South Sudan',
  Spain = 'Spain',
  SriLanka = 'Sri Lanka',
  Sudan = 'Sudan',
  Suriname = 'Suriname',
  Sweden = 'Sweden',
  Switzerland = 'Switzerland',
  Syria = 'Syria',
  Taiwan = 'Taiwan',
  Tajikistan = 'Tajikistan',
  Tanzania = 'Tanzania',
  Thailand = 'Thailand',
  Togo = 'Togo',
  Tonga = 'Tonga',
  TrinidadAndTobago = 'Trinidad and Tobago',
  Tunisia = 'Tunisia',
  Turkey = 'Turkey',
  Turkmenistan = 'Turkmenistan',
  Tuvalu = 'Tuvalu',
  Uganda = 'Uganda',
  Ukraine = 'Ukraine',
  UnitedArabEmirates = 'United Arab Emirates',
  UnitedKingdom = 'United Kingdom',
  UnitedStates = 'United States',
  Uruguay = 'Uruguay',
  Uzbekistan = 'Uzbekistan',
  Vanuatu = 'Vanuatu',
  VaticanCity = 'Vatican City',
  Venezuela = 'Venezuela',
  Vietnam = 'Vietnam',
  Yemen = 'Yemen',
  Zambia = 'Zambia',
  Zimbabwe = 'Zimbabwe',
}

export enum UserPermission {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  @Length(2, 100)
  name: string;

  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    await this.hashPassword();
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (this.password !== this.previousPassword) {
      await this.hashPassword();
    }
  }

  private async hashPassword() {
    if (this.password && !this.isPasswordHashed(this.password)) {
      console.log(`Hashing password: ${this.password}`);
      this.password = await hashPassword(this.password);
      console.log(`Hashed password: ${this.password}`);
    }
  }

  private isPasswordHashed(password: string): boolean {
    return password.startsWith('$2a$') || password.startsWith('$2b$');
  }

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  @Column({
    type: 'enum',
    enum: UserPermission,
    default: UserPermission.User,
  })
  permission: UserPermission;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  balance: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  copytrade_balance: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  plan_balance: number;

  @Column({ type: Boolean, default: false })
  isVerified: boolean;

  @Column({ type: String })
  referral_id: string;

  @Column({ type: String, nullable: true })
  front_image: string;

  @Column({ type: String, nullable: true })
  back_image: string;

  @Column({ type: String })
  phone_number: string;

  @Column({ type: String })
  address: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'enum', enum: Country })
  country: Country;

  // @Column({ type: Boolean, default: false })
  // suspended: boolean;
  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  transactions: Transaction;

  @OneToMany(() => Plan, (plan) => plan.user, {
    cascade: true,
  })
  plan: Plan;

  @OneToMany(() => CopyTrade, (copytrade) => copytrade.user, {
    cascade: true,
  })
  copytrade: CopyTrade;

  @OneToMany(() => CryptoWallet, (wallet) => wallet.user, {
    cascade: true,
  })
  crypto_wallet: CryptoWallet;

  @DeleteDateColumn()
  deletedAt?: Date;
}
