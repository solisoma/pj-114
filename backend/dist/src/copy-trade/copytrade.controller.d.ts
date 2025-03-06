import { CopyTradeDto } from './dto/copyTradeDto';
import { CopyTrade } from '@app/typeorm/entities/copy.trade.entity';
import { CopyTradeService } from './copytrade.service';
export declare class CopyTradeController {
    private readonly copyTradeService;
    constructor(copyTradeService: CopyTradeService);
    subscribeUser(copyTradeDto: CopyTradeDto, req: any): Promise<CopyTradeDto>;
    changeUserStatus(req: any): Promise<CopyTrade[]>;
}
