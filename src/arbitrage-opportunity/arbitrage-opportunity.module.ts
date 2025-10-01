import { Module } from '@nestjs/common';
import { ArbitrageOpportunityService } from './arbitrage-opportunity.service';
import { ArbitrageOpportunityController } from './arbitrage-opportunity.controller';
import { ArbitrageModule } from '../arbitrage/arbitrage.module';

@Module({
  imports: [ArbitrageModule],
  controllers: [ArbitrageOpportunityController],
  providers: [ArbitrageOpportunityService],
})
export class ArbitrageOpportunityModule {}
