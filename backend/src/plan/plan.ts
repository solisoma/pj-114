/* eslint-disable prettier/prettier */
import { Plan } from '@app/typeorm/entities/plan.entity';
import { PlanDto } from './dto/PlanDto';

export interface IPlanService {
  subscribeUser(id: number, copyTradeDto: PlanDto): Promise<Plan>;
  getSubscribedUser(id: number): Promise<Plan[]>;
}
