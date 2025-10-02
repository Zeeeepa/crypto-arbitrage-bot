import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private readonly provider: ethers.JsonRpcProvider;
  private readonly signer: ethers.Signer;
  private readonly chainId: number;

  constructor(private readonly config: ConfigService) {
    const rpcUrl = this.config.get<string>('ETHEREUM_RPC_URL', 'http://localhost:8545');
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    const privateKey = this.config.get<string>('PRIVATE_KEY');
    // If no PRIVATE_KEY is provided, generate an ephemeral wallet (not persisted)
    const wallet = privateKey && /^0x[0-9a-fA-F]{64}$/.test(privateKey)
      ? new ethers.Wallet(privateKey)
      : ethers.Wallet.createRandom();
    this.signer = wallet.connect(this.provider);
    this.chainId = this.config.get<number>('CHAIN_ID', 1);
  }

  getProvider(): ethers.JsonRpcProvider {
    return this.provider;
  }

  getSigner(): ethers.Signer {
    return this.signer;
  }

  getChainId(): number {
    return this.chainId;
  }
}


