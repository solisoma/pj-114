/* eslint-disable prettier/prettier */
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { User } from 'src/typeorm/entities/user.entity';
import { ChangePasswordDto } from './dto/changePasswordDto';
import {
  adminChangeUserStatusDto,
  DepositDto,
  KycDto,
  ProofDto,
  transcDetailsDto,
  TransferDto,
} from './dto/user.general.dto';
import { Transaction } from '@app/typeorm/entities/transaction.entity';

export interface IUsersService {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findOneUser(options: EntityCondition<User>): Promise<NullableType<User>>;
  findUsersWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<User[]>;
  updateUser(id: User['id'], payload: DeepPartial<User>): Promise<User>;
  adminChangeUserStatus(
    id: number,
    userDetail: adminChangeUserStatusDto,
  ): Promise<void>;
  updateBalance(id: number, transcDetails: transcDetailsDto): Promise<void>;
  deleteUser(id: User['id']): Promise<void>;
  saveUser(user: User): Promise<User>;
  getAllUser(id: number): Promise<User[]>;
  getTrx(id: number): Promise<Transaction[]>;
  handleKYC(id: number, details: KycDto): Promise<void>;
  addDepositProof(proof: ProofDto): Promise<void>;
  deposit(id: number, details: DepositDto): Promise<Transaction>;
  withdraw(id: number, details: DepositDto): Promise<Transaction>;
  transfer(id: number, trxDetails: TransferDto): Promise<void>;
  changePassword(
    id: User['id'],
    changePasswordDto: ChangePasswordDto,
  ): Promise<void>;
}
