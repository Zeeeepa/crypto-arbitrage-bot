import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArbitrageOpportunityService } from './arbitrage-opportunity.service';
import { CreateArbitrageOpportunityDto } from './dto/create-arbitrage-opportunity.dto';
import { UpdateArbitrageOpportunityDto } from './dto/update-arbitrage-opportunity.dto';

@Controller('arbitrage-opportunity')
export class ArbitrageOpportunityController {
  constructor(private readonly arbitrageOpportunityService: ArbitrageOpportunityService) {}

  @Post()
  create(@Body() createArbitrageOpportunityDto: CreateArbitrageOpportunityDto) {
    return this.arbitrageOpportunityService.create(createArbitrageOpportunityDto);
  }

  @Get()
  findAll() {
    return this.arbitrageOpportunityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arbitrageOpportunityService.findOne(+id);
  }

  @Post('scan')
  scanOnce() {
    return this.arbitrageOpportunityService.scanOnce();
  }

  @Post('execute')
  executeBest() {
    return this.arbitrageOpportunityService.executeBest();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArbitrageOpportunityDto: UpdateArbitrageOpportunityDto) {
    return this.arbitrageOpportunityService.update(+id, updateArbitrageOpportunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arbitrageOpportunityService.remove(+id);
  }
}
