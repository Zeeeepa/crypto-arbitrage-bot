import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      validationSchema: Joi.object({
        ETHEREUM_RPC_URL: Joi.string().uri().default('http://127.0.0.1:8545'),
        PRIVATE_KEY: Joi.string().pattern(/^0x[0-9a-fA-F]{64}$/).optional(),
        FLASHBOTS_RELAY_SIGNING_KEY: Joi.string()
          .pattern(/^0x[0-9a-fA-F]{64}$/)
          .optional(),
        BUNDLE_EXECUTOR_ADDRESS: Joi.string()
          .pattern(/^0x[0-9a-fA-F]{40}$/)
          .optional(),
        HEALTHCHECK_URL: Joi.string().uri().optional(),
        MINER_REWARD_PERCENTAGE: Joi.number().integer().min(0).max(100).default(30),
        PORT: Joi.number().default(3000),
        CHAIN_ID: Joi.number().default(1),
        POLLING_INTERVAL_MS: Joi.number().default(6000),
      }),
    }),
  ],
})
export class ConfiguredConfigModule {}


