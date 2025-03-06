import { Repository } from 'typeorm';
import { TransactionService } from '@app/transaction/transaction.service';
import { User } from '@app/typeorm/entities/user.entity';
import { CopyTradeDto } from './dto/copyTradeDto';
import { CopyTrade } from '@app/typeorm/entities/copy.trade.entity';
import { ICopyTradeService } from './copytrade';
export declare class CopyTradeService implements ICopyTradeService {
    private readonly usersRepository;
    private readonly copyTradeRepository;
    private readonly trxService;
    constructor(usersRepository: Repository<User>, copyTradeRepository: Repository<CopyTrade>, trxService: TransactionService);
    subscribeUser(id: number, copyTradeDto: CopyTradeDto): Promise<CopyTrade>;
    getSubscribedUser(id: number): Promise<CopyTrade[]>;
}
