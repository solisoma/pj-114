import { IUsersService } from './users';
import { ChangePasswordDto } from './dto/changePasswordDto';
import { adminChangeUserStatusDto, DepositDto, IdDto, KycDto, ProofDto, transcDetailsDto, TransferDto, UserDto } from './dto/user.general.dto';
import { NullableType } from '@app/utils/types/nullable.type';
import { User } from '@app/typeorm/entities/user.entity';
import { Transaction } from '@app/typeorm/entities/transaction.entity';
import { UpdateTrxDto } from '@app/transaction/dto/transactionDto';
import { TransactionService } from '@app/transaction/transaction.service';
import { UploadService } from '@app/upload/upload.service';
import { Referral } from '@app/typeorm/entities/referral.entity';
export declare class UsersController {
    private readonly userService;
    private readonly trxService;
    private readonly uploadService;
    constructor(userService: IUsersService, trxService: TransactionService, uploadService: UploadService);
    changePassword(changePasswordDto: ChangePasswordDto, req: any): Promise<void>;
    changeUserStatus(userDetail: adminChangeUserStatusDto, req: any): Promise<void>;
    getUser(param: UserDto): Promise<NullableType<User>>;
    getTrx(param: IdDto, req: any): Promise<Transaction[]>;
    getReferrals(req: any): Promise<Referral[]>;
    getUsers(req: any): Promise<User[]>;
    updateBalance(transcDetails: transcDetailsDto, req: any): Promise<void>;
    transfer(transcDetails: TransferDto, req: any): Promise<void>;
    withdraw(transcDetails: DepositDto, req: any): Promise<Transaction>;
    deposit(transcDetails: DepositDto, req: any): Promise<Transaction>;
    updateTrxStatus(transcDetails: UpdateTrxDto): Promise<Transaction>;
    handleKYC(Details: KycDto, req: any, res: any): Promise<void>;
    addDepositProof(Details: ProofDto, req: any, res: any): Promise<void>;
}
