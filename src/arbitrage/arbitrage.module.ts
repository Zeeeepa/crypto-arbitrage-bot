import { Module } from '@nestjs/common';
import { DexModule } from '../dex/dex.module';
import { ArbitrageScannerService } from './scanner.service';
import { ArbitrageExecutorService } from './executor.service';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [DexModule, BlockchainModule],
  providers: [ArbitrageScannerService, ArbitrageExecutorService],
  exports: [ArbitrageScannerService, ArbitrageExecutorService],
})
export class ArbitrageModule {}


