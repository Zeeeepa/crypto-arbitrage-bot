import { Test, TestingModule } from '@nestjs/testing';
import { ArbitrageOpportunityService } from './arbitrage-opportunity.service';

describe('ArbitrageOpportunityService', () => {
  let service: ArbitrageOpportunityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArbitrageOpportunityService],
    }).compile();

    service = module.get<ArbitrageOpportunityService>(ArbitrageOpportunityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
