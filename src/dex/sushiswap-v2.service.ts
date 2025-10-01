import { Injectable } from '@nestjs/common';
import { BlockchainService } from '../blockchain/blockchain.service';
import { ethers } from 'ethers';
import { UNISWAP_V2_FACTORY_ABI, UNISWAP_V2_PAIR_ABI } from './v2-abis';

@Injectable()
export class SushiSwapV2Service {
  private readonly factoryAddress = '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac';

  constructor(private readonly chain: BlockchainService) {}

  getFactoryContract() {
    return new ethers.Contract(this.factoryAddress, UNISWAP_V2_FACTORY_ABI, this.chain.getProvider());
  }

  getPairContract(pairAddress: string) {
    return new ethers.Contract(pairAddress, UNISWAP_V2_PAIR_ABI, this.chain.getProvider());
  }

  async getPairAddress(tokenA: string, tokenB: string): Promise<string> {
    const factory = this.getFactoryContract();
    return await factory.getPair(tokenA, tokenB);
  }

  async getReserves(pairAddress: string): Promise<{ reserve0: bigint; reserve1: bigint }> {
    const pair = this.getPairContract(pairAddress);
    const [reserve0, reserve1] = await pair.getReserves();
    return { reserve0, reserve1 };
  }
}


