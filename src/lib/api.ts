import { PortfolioData, NFTCollection } from './types';

const API_KEY = process.env.NEXT_PUBLIC_COINSTATS_API_KEY;
const BASE_URL = 'https://api.coinstats.app/v2';

export async function getEthPrice(): Promise<number> {
  try {
    const response = await fetch(`${BASE_URL}/coins?coinId=ethereum`, {
      headers: {
        'X-API-KEY': API_KEY || '',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch ETH price');
    }

    const data = await response.json();
    return data.coin?.price || 0;
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return 0;
  }
}

export async function getNFTPortfolio(walletAddress: string): Promise<PortfolioData> {
  try {
    const [portfolioResponse, ethPrice] = await Promise.all([
      fetch(`${BASE_URL}/nfts/portfolio/${walletAddress}`, {
        headers: {
          'X-API-KEY': API_KEY || '',
        },
      }),
      getEthPrice(),
    ]);

    if (!portfolioResponse.ok) {
      throw new Error('Failed to fetch portfolio data');
    }

    const data = await portfolioResponse.json();
    const collections: NFTCollection[] = data.collections.map((collection: any) => ({
      name: collection.name,
      symbol: collection.symbol,
      floorPriceEth: collection.floorPrice,
      floorPriceUsd: collection.floorPrice * ethPrice,
      assetsCount: collection.assetsCount,
      totalValueEth: collection.floorPrice * collection.assetsCount,
      totalValueUsd: collection.floorPrice * collection.assetsCount * ethPrice,
      chain: collection.chain,
    }));

    const totalValueEth = collections.reduce((sum, col) => sum + col.totalValueEth, 0);
    const totalValueUsd = collections.reduce((sum, col) => sum + col.totalValueUsd, 0);

    return {
      collections,
      totalValueEth,
      totalValueUsd,
      ethPrice,
    };
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return {
      collections: [],
      totalValueEth: 0,
      totalValueUsd: 0,
      ethPrice: 0,
    };
  }
} 