import { Repository } from 'typeorm';
import { User } from '@app/typeorm/entities/user.entity';
import { CreateTrxDto, UpdateTrxDto } from './dto/transactionDto';
import { Transaction } from '@app/typeorm/entities/transaction.entity';
export declare class TransactionService {
    private readonly trxRepository;
    private readonly usersRepository;
    constructor(trxRepository: Repository<Transaction>, usersRepository: Repository<User>);
    createTrx(id: number, createTrxDto: CreateTrxDto): Promise<Transaction>;
    updateTrx(id: number, updateTrxDto: UpdateTrxDto): Promise<Transaction>;
}
