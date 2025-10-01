import { Test, TestingModule } from '@nestjs/testing';
import { ArbitrageOpportunityController } from './arbitrage-opportunity.controller';
import { ArbitrageOpportunityService } from './arbitrage-opportunity.service';

describe('ArbitrageOpportunityController', () => {
  let controller: ArbitrageOpportunityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArbitrageOpportunityController],
      providers: [ArbitrageOpportunityService],
    }).compile();

    controller = module.get<ArbitrageOpportunityController>(ArbitrageOpportunityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
