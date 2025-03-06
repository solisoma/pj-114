import { PlanDto } from './dto/PlanDto';
import { Plan } from '@app/typeorm/entities/plan.entity';
import { PlanService } from './plan.service';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    subscribeUser(planDto: PlanDto, req: any): Promise<Plan>;
    changeUserStatus(req: any): Promise<Plan[]>;
}
