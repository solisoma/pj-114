/* eslint-disable prettier/prettier */
import { CopyTradeDto } from './dto/copyTradeDto';
import { CopyTrade } from '@app/typeorm/entities/copy.trade.entity';

export interface ICopyTradeService {
  subscribeUser(id: number, copyTradeDto: CopyTradeDto): Promise<CopyTrade>;
  getSubscribedUser(id: number): Promise<CopyTrade[]>;
}
