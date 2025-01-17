/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CopyTradeService } from './copytrade.service';

describe('CopyTradeService', () => {
  let service: CopyTradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CopyTradeService],
    }).compile();

    service = module.get<CopyTradeService>(CopyTradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
