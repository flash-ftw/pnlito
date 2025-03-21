export interface NFTCollection {
  name: string;
  symbol: string;
  floorPriceEth: number;
  floorPriceUsd: number;
  assetsCount: number;
  totalValueEth: number;
  totalValueUsd: number;
  chain: string;
}

export interface PortfolioData {
  collections: NFTCollection[];
  totalValueEth: number;
  totalValueUsd: number;
  ethPrice: number;
} 