/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { IUsersService } from './users';
import { User, UserPermission } from 'src/typeorm/entities/user.entity';
import { CreateUserDto } from './dto/createUserDto';
import { compareHash, hashPassword } from 'src/utils/helpers';
import { ChangePasswordDto } from './dto/changePasswordDto';
// import { Services } from 'src/utils/constants';
// import { IMailsService } from 'src/mails/mails';
import {
  Actions,
  adminChangeUserStatusDto,
  DepositDto,
  Directions,
  KycDto,
  ProofDto,
  transcDetailsDto,
  TransferDto,
  TrxCategory,
} from './dto/user.general.dto';
import {
  Category,
  Transaction,
  TrxStatus,
} from '@app/typeorm/entities/transaction.entity';
import { TransactionService } from '@app/transaction/transaction.service';
import { Referral } from '@app/typeorm/entities/referral.entity';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Transaction)
    private readonly trxRepository: Repository<Transaction>,
    @InjectRepository(Referral)
    private readonly refRepository: Repository<Referral>,
    private readonly trxService: TransactionService,
    // @Inject(Services.MAILS) private readonly mailsService: IMailsService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findOneUser(
    options: EntityCondition<User>,
  ): Promise<NullableType<User>> {
    const user = await this.usersRepository.findOne({
      where: options,
    });

    return user;
  }

  async getAllUser(id: number): Promise<User[]> {
    const currentUser = await this.usersRepository.findOne({ where: { id } });

    if (currentUser.permission === UserPermission.User)
      throw new HttpException('Not allowed', HttpStatus.FORBIDDEN);

    return await this.usersRepository.find({
      select: ['id', 'name', 'email'],
    });
  }

  findUsersWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<User[]> {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async updateUser(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    const restrictedFields = ['provider', 'status', 'hash', 'socialId'];
    for (const field of restrictedFields) {
      if (field in payload) {
        delete payload[field];
      }
    }

    if (payload.password) {
      payload.password = await hashPassword(payload.password);
    }

    await this.usersRepository.update(id, payload);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }

  async deleteUser(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async adminChangeUserStatus(
    id: number,
    userDetail: adminChangeUserStatusDto,
  ): Promise<void> {
    const { action, userId } = userDetail;

    const isUser = await this.usersRepository.findOne({ where: { id } });
    const objectUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    // Does users exist
    if (!isUser || !objectUser)
      throw new HttpException(
        "One of the user doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    // is user admin or super admin
    if (isUser.permission === UserPermission.User)
      throw new HttpException(
        "User doesn't have the permission",
        HttpStatus.UNAUTHORIZED,
      );

    switch (action) {
      case Actions.Delete:
        if (isUser.permission === UserPermission.Admin) {
          await this.usersRepository.delete(userId);
        } else {
          throw new HttpException(
            "User doesn't have the permission",
            HttpStatus.UNAUTHORIZED,
          );
        }
        break;
      case Actions.Verify:
        if (isUser.permission === UserPermission.Admin) {
          await this.usersRepository.update(userId, { isVerified: true });
        } else {
          throw new HttpException(
            "User doesn't have the permission",
            HttpStatus.UNAUTHORIZED,
          );
        }
        break;
      case Actions.NotVerify:
        if (isUser.permission === UserPermission.Admin) {
          await this.usersRepository.update(userId, { isVerified: false });
        } else {
          throw new HttpException(
            "User doesn't have the permission",
            HttpStatus.UNAUTHORIZED,
          );
        }
        break;
      case Actions.ToAdmin:
        if (isUser.permission === UserPermission.Admin) {
          await this.usersRepository.update(userId, {
            permission: UserPermission.Admin,
          });
        } else {
          throw new HttpException(
            "User doesn't have the permission",
            HttpStatus.UNAUTHORIZED,
          );
        }
        break;
      case Actions.ToUser:
        if (isUser.permission === UserPermission.Admin) {
          await this.usersRepository.update(userId, {
            permission: UserPermission.User,
          });
        } else {
          throw new HttpException(
            "User doesn't have the permission",
            HttpStatus.UNAUTHORIZED,
          );
        }
        break;
    }
  }

  async updateBalance(
    id: number,
    transcDetails: transcDetailsDto,
  ): Promise<void> {
    const { amount, userId, direction } = transcDetails;

    const isUser = await this.usersRepository.findOne({ where: { id } });
    const objectUser = await this.usersRepository.findOne({
      where: { id: userId },
    });

    // Does users exist
    if (!isUser || !objectUser)
      throw new HttpException(
        "One of the user doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    let newBalance: number;
    switch (direction) {
      case Directions.Send:
        newBalance = objectUser.balance - amount;
        await this.usersRepository.update(userId, { balance: newBalance });
        if (transcDetails.pnl)
          await this.trxService.createTrx(userId, {
            service: `Lost`,
            amount,
            status: TrxStatus.Successful,
            category: Category.PNL,
          });
        break;
      case Directions.Receive:
        if (isUser.permission === UserPermission.Admin) {
          newBalance = Number(objectUser.balance) + Number(amount);
          await this.usersRepository.update(userId, {
            balance: newBalance,
          });
          if (transcDetails.pnl)
            await this.trxService.createTrx(userId, {
              service: `Profit`,
              amount,
              status: TrxStatus.Successful,
              category: Category.PNL,
            });
        } else {
          throw new HttpException(
            "User doesn't have the permission",
            HttpStatus.UNAUTHORIZED,
          );
        }
    }
  }

  async addDepositProof(proof: ProofDto): Promise<void> {
    const { id, file } = proof;

    const trx = await this.trxRepository.findOne({ where: { id } });

    if (!trx)
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    trx.proof = file;
    this.trxRepository.save(trx);
  }

  async handleKYC(id: number, details: KycDto): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.front_image = details.front;
    user.back_image = details.back;
    await this.usersRepository.save(user);
  }

  async deposit(id: number, details: DepositDto): Promise<Transaction> {
    const { amount } = details;
    return await this.trxService.createTrx(id, {
      service: 'Deposit',
      category: Category.Deposit,
      amount,
    });
  }

  async withdraw(id: number, details: DepositDto): Promise<Transaction> {
    const { amount } = details;
    return await this.trxService.createTrx(id, {
      service: 'Withdrawal',
      category: Category.Withdrawal,
      amount,
    });
  }

  async transfer(id: number, trxDetails: TransferDto): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    const { from, to, amount } = trxDetails;

    const keys = ['balance', 'copytrade_balance', 'plan_balance'];
    if (!keys.includes(from))
      throw new HttpException(
        `Wrong value for field "from" must be one of this values ${String(keys)}`,
        HttpStatus.CONFLICT,
      );

    if (!keys.includes(to))
      throw new HttpException(
        `Wrong value for field "to" must be one of this values ${String(keys)}`,
        HttpStatus.CONFLICT,
      );

    if (from === to)
      throw new HttpException(
        "from and to can't be same value",
        HttpStatus.CONFLICT,
      );

    if (user[from] >= amount) {
      user[from] = Number(user[from]) - Number(amount);
      user[to] = Number(user[to]) + Number(amount);

      this.usersRepository.save(user);
      return;
    }

    throw new HttpException('Insufficient funds', HttpStatus.CONFLICT);
  }

  async getTrx(id: number, category: TrxCategory): Promise<Transaction[]> {
    const isUser = await this.usersRepository.findOne({ where: { id } });

    // Does users exist
    if (!isUser)
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    if (category === TrxCategory.All)
      return await this.trxRepository.find({
        where: { user: { id } },
        order: { id: 'DESC' },
      });

    if (category === TrxCategory.Deposit)
      return await this.trxRepository.find({
        where: { user: { id }, category: Category.Deposit },
        order: { id: 'DESC' },
      });

    return await this.trxRepository.find({
      where: { user: { id }, category: Category.Withdrawal },
      order: { id: 'DESC' },
    });
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
    });
    if (!existingUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isValidPassword = await compareHash(
      changePasswordDto.currentPassword,
      existingUser.password,
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'incorrectCurrentPassword',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword)
      throw new HttpException(
        'Confirm password does not match new password',
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = await hashPassword(changePasswordDto.newPassword);
    const user = {
      ...existingUser,
      password: hashedPassword,
    };

    await this.usersRepository.save(user);
  }

  async getRefferrals(id: number): Promise<Referral[]> {
    return await this.refRepository
      .createQueryBuilder('ref')
      .leftJoinAndSelect('ref.host', 'host')
      .select(['ref', 'host.name']) // Select ref fields and only user.name
      .where('ref.userId = :id', { id })
      .orderBy('ref.id', 'DESC')
      .getMany();
  }
}
