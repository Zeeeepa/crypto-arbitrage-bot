import { Module } from '@nestjs/common';
import { UniswapV2Service } from './uniswap-v2.service';
import { SushiSwapV2Service } from './sushiswap-v2.service';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [BlockchainModule],
  providers: [UniswapV2Service, SushiSwapV2Service],
  exports: [UniswapV2Service, SushiSwapV2Service],
})
export class DexModule {}


