import { Repository } from 'typeorm';
import { TransactionService } from '@app/transaction/transaction.service';
import { User } from '@app/typeorm/entities/user.entity';
import { Plan } from '@app/typeorm/entities/plan.entity';
import { PlanDto } from './dto/PlanDto';
import { IPlanService } from './plan';
export declare class PlanService implements IPlanService {
    private readonly usersRepository;
    private readonly planRepository;
    private readonly trxService;
    constructor(usersRepository: Repository<User>, planRepository: Repository<Plan>, trxService: TransactionService);
    subscribeUser(id: number, planDto: PlanDto): Promise<Plan>;
    getSubscribedUser(id: number): Promise<Plan[]>;
}
