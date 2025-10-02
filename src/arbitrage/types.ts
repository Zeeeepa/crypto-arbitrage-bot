export type OpportunityRoute = 'UNI->SUSHI' | 'SUSHI->UNI';

export interface Opportunity {
  route: OpportunityRoute;
  tokenIn: string;
  tokenOut: string;
  amountIn: string; // decimal-scaled string
  estimatedProfitOut: string; // decimal-scaled string
  pairUni: string;
  pairSushi: string;
}

export interface PairReservesSnapshot {
  uniPair: string;
  sushiPair: string;
  uniRes: { reserve0: bigint; reserve1: bigint };
  sushiRes: { reserve0: bigint; reserve1: bigint };
  uniPrice: number;
  sushiPrice: number;
  spread: number;
  opportunity: Opportunity | null;
}


