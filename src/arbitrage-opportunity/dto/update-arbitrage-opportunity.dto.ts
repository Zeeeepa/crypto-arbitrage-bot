import { PartialType } from '@nestjs/mapped-types';
import { CreateArbitrageOpportunityDto } from './create-arbitrage-opportunity.dto';

export class UpdateArbitrageOpportunityDto extends PartialType(CreateArbitrageOpportunityDto) {}
