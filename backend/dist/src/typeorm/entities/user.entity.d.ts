import { Transaction } from './transaction.entity';
import { CopyTrade } from './copy.trade.entity';
import { Plan } from './plan.entity';
import { CryptoWallet } from './bank.account.entity';
export declare enum UserStatus {
    Active = "active",
    Inactive = "inactive"
}
export declare enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export declare enum Country {
    Afghanistan = "Afghanistan",
    Albania = "Albania",
    Algeria = "Algeria",
    Andorra = "Andorra",
    Angola = "Angola",
    AntiguaAndBarbuda = "Antigua and Barbuda",
    Argentina = "Argentina",
    Armenia = "Armenia",
    Australia = "Australia",
    Austria = "Austria",
    Azerbaijan = "Azerbaijan",
    Bahamas = "Bahamas",
    Bahrain = "Bahrain",
    Bangladesh = "Bangladesh",
    Barbados = "Barbados",
    Belarus = "Belarus",
    Belgium = "Belgium",
    Belize = "Belize",
    Benin = "Benin",
    Bhutan = "Bhutan",
    Bolivia = "Bolivia",
    BosniaAndHerzegovina = "Bosnia and Herzegovina",
    Botswana = "Botswana",
    Brazil = "Brazil",
    Brunei = "Brunei",
    Bulgaria = "Bulgaria",
    BurkinaFaso = "Burkina Faso",
    Burundi = "Burundi",
    Cambodia = "Cambodia",
    Cameroon = "Cameroon",
    Canada = "Canada",
    CapeVerde = "Cape Verde",
    CentralAfricanRepublic = "Central African Republic",
    Chad = "Chad",
    Chile = "Chile",
    China = "China",
    Colombia = "Colombia",
    Comoros = "Comoros",
    CongoDR = "Congo (DR)",
    CostaRica = "Costa Rica",
    Croatia = "Croatia",
    Cuba = "Cuba",
    Cyprus = "Cyprus",
    CzechRepublic = "Czech Republic",
    Denmark = "Denmark",
    Djibouti = "Djibouti",
    Dominica = "Dominica",
    DominicanRepublic = "Dominican Republic",
    EastTimor = "East Timor",
    Ecuador = "Ecuador",
    Egypt = "Egypt",
    ElSalvador = "El Salvador",
    EquatorialGuinea = "Equatorial Guinea",
    Eritrea = "Eritrea",
    Estonia = "Estonia",
    Eswatini = "Eswatini",
    Ethiopia = "Ethiopia",
    Fiji = "Fiji",
    Finland = "Finland",
    France = "France",
    Gabon = "Gabon",
    Gambia = "Gambia",
    Georgia = "Georgia",
    Germany = "Germany",
    Ghana = "Ghana",
    Greece = "Greece",
    Grenada = "Grenada",
    Guatemala = "Guatemala",
    Guinea = "Guinea",
    GuineaBissau = "Guinea-Bissau",
    Guyana = "Guyana",
    Haiti = "Haiti",
    Honduras = "Honduras",
    Hungary = "Hungary",
    Iceland = "Iceland",
    India = "India",
    Indonesia = "Indonesia",
    Iran = "Iran",
    Iraq = "Iraq",
    Ireland = "Ireland",
    Israel = "Israel",
    Italy = "Italy",
    IvoryCoast = "Ivory Coast",
    Jamaica = "Jamaica",
    Japan = "Japan",
    Jordan = "Jordan",
    Kazakhstan = "Kazakhstan",
    Kenya = "Kenya",
    Kiribati = "Kiribati",
    KoreaNorth = "Korea (North)",
    KoreaSouth = "Korea (South)",
    Kosovo = "Kosovo",
    Kuwait = "Kuwait",
    Kyrgyzstan = "Kyrgyzstan",
    Laos = "Laos",
    Latvia = "Latvia",
    Lebanon = "Lebanon",
    Lesotho = "Lesotho",
    Liberia = "Liberia",
    Libya = "Libya",
    Liechtenstein = "Liechtenstein",
    Lithuania = "Lithuania",
    Luxembourg = "Luxembourg",
    Madagascar = "Madagascar",
    Malawi = "Malawi",
    Malaysia = "Malaysia",
    Maldives = "Maldives",
    Mali = "Mali",
    Malta = "Malta",
    MarshallIslands = "Marshall Islands",
    Mauritania = "Mauritania",
    Mauritius = "Mauritius",
    Mexico = "Mexico",
    Micronesia = "Micronesia",
    Moldova = "Moldova",
    Monaco = "Monaco",
    Mongolia = "Mongolia",
    Montenegro = "Montenegro",
    Morocco = "Morocco",
    Mozambique = "Mozambique",
    Myanmar = "Myanmar",
    Namibia = "Namibia",
    Nauru = "Nauru",
    Nepal = "Nepal",
    Netherlands = "Netherlands",
    NewZealand = "New Zealand",
    Nicaragua = "Nicaragua",
    Niger = "Niger",
    Nigeria = "Nigeria",
    NorthMacedonia = "North Macedonia",
    Norway = "Norway",
    Oman = "Oman",
    Pakistan = "Pakistan",
    Palau = "Palau",
    Palestine = "Palestine",
    Panama = "Panama",
    PapuaNewGuinea = "Papua New Guinea",
    Paraguay = "Paraguay",
    Peru = "Peru",
    Philippines = "Philippines",
    Poland = "Poland",
    Portugal = "Portugal",
    Qatar = "Qatar",
    Romania = "Romania",
    Russia = "Russia",
    Rwanda = "Rwanda",
    SaintKittsAndNevis = "Saint Kitts and Nevis",
    SaintLucia = "Saint Lucia",
    SaintVincentAndTheGrenadines = "Saint Vincent and the Grenadines",
    Samoa = "Samoa",
    SanMarino = "San Marino",
    SaoTomeAndPrincipe = "Sao Tome and Principe",
    SaudiArabia = "Saudi Arabia",
    Senegal = "Senegal",
    Serbia = "Serbia",
    Seychelles = "Seychelles",
    SierraLeone = "Sierra Leone",
    Singapore = "Singapore",
    Slovakia = "Slovakia",
    Slovenia = "Slovenia",
    SolomonIslands = "Solomon Islands",
    Somalia = "Somalia",
    SouthAfrica = "South Africa",
    SouthSudan = "South Sudan",
    Spain = "Spain",
    SriLanka = "Sri Lanka",
    Sudan = "Sudan",
    Suriname = "Suriname",
    Sweden = "Sweden",
    Switzerland = "Switzerland",
    Syria = "Syria",
    Taiwan = "Taiwan",
    Tajikistan = "Tajikistan",
    Tanzania = "Tanzania",
    Thailand = "Thailand",
    Togo = "Togo",
    Tonga = "Tonga",
    TrinidadAndTobago = "Trinidad and Tobago",
    Tunisia = "Tunisia",
    Turkey = "Turkey",
    Turkmenistan = "Turkmenistan",
    Tuvalu = "Tuvalu",
    Uganda = "Uganda",
    Ukraine = "Ukraine",
    UnitedArabEmirates = "United Arab Emirates",
    UnitedKingdom = "United Kingdom",
    UnitedStates = "United States",
    Uruguay = "Uruguay",
    Uzbekistan = "Uzbekistan",
    Vanuatu = "Vanuatu",
    VaticanCity = "Vatican City",
    Venezuela = "Venezuela",
    Vietnam = "Vietnam",
    Yemen = "Yemen",
    Zambia = "Zambia",
    Zimbabwe = "Zimbabwe"
}
export declare enum UserPermission {
    Admin = "admin",
    User = "user"
}
export declare class User {
    id: number;
    name: string;
    email: string | null;
    password: string;
    previousPassword: string;
    loadPreviousPassword(): void;
    hashPasswordBeforeInsert(): Promise<void>;
    hashPasswordBeforeUpdate(): Promise<void>;
    private hashPassword;
    private isPasswordHashed;
    provider: string;
    status: UserStatus;
    permission: UserPermission;
    createdAt: Date;
    hash: string | null;
    updatedAt: Date;
    balance: number;
    copytrade_balance: number;
    plan_balance: number;
    isVerified: boolean;
    referral_id: string;
    front_image: string;
    back_image: string;
    phone_number: string;
    address: string;
    gender: Gender;
    country: Country;
    transactions: Transaction;
    plan: Plan;
    copytrade: CopyTrade;
    crypto_wallet: CryptoWallet;
    deletedAt?: Date;
}
