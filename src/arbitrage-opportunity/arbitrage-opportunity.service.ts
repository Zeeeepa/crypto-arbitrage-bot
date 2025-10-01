import { Injectable } from '@nestjs/common';
import { CreateArbitrageOpportunityDto } from './dto/create-arbitrage-opportunity.dto';
import { UpdateArbitrageOpportunityDto } from './dto/update-arbitrage-opportunity.dto';
import { ArbitrageScannerService } from '../arbitrage/scanner.service';
import { ArbitrageExecutorService } from '../arbitrage/executor.service';

@Injectable()
export class ArbitrageOpportunityService {
  constructor(
    private readonly scanner: ArbitrageScannerService,
    private readonly executor: ArbitrageExecutorService,
  ) {}

  create(createArbitrageOpportunityDto: CreateArbitrageOpportunityDto) {
    return 'This action adds a new arbitrageOpportunity';
  }

  findAll() {
    return this.scanner.getLastSnapshot();
  }

  findOne(id: number) {
    return `This action returns a #${id} arbitrageOpportunity`;
  }

  update(id: number, updateArbitrageOpportunityDto: UpdateArbitrageOpportunityDto) {
    return `This action updates a #${id} arbitrageOpportunity`;
  }

  remove(id: number) {
    return `This action removes a #${id} arbitrageOpportunity`;
  }

  async scanOnce() {
    return this.scanner.scanOnce();
  }

  async executeBest() {
    const opportunity = this.scanner.getBestOpportunity();
    if (!opportunity) return { executed: false, reason: 'No opportunity' };
    const tx = await this.executor.execute(opportunity);
    return { executed: true, tx };
  }
}
