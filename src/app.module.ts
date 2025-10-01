import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArbitrageOpportunityModule } from './arbitrage-opportunity/arbitrage-opportunity.module';
import { WalletModule } from './wallet/wallet.module';
import { ConfiguredConfigModule } from './config/config.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BlockchainModule } from './blockchain/blockchain.module';
import { DexModule } from './dex/dex.module';
import { ArbitrageModule } from './arbitrage/arbitrage.module';

@Module({
  imports: [
    ConfiguredConfigModule,
    ScheduleModule.forRoot(),
    BlockchainModule,
    DexModule,
    ArbitrageModule,
    ArbitrageOpportunityModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
