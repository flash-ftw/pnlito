import { PortfolioData, NFTCollection } from './types';

const API_KEY = process.env.NEXT_PUBLIC_COINSTATS_API_KEY;
const BASE_URL = 'https://api.coinstats.app/public/v1';

export async function getEthPrice(): Promise<number> {
  try {
    const response = await fetch(`${BASE_URL}/coins/ethereum`, {
      headers: {
        'accept': 'application/json',
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
    // First get ETH price
    const ethPrice = await getEthPrice();

    // Fetch NFTs for the wallet
    const nftResponse = await fetch(`${BASE_URL}/nfts/address/${walletAddress}`, {
      headers: {
        'accept': 'application/json',
      },
    });

    if (!nftResponse.ok) {
      throw new Error('Failed to fetch NFT data');
    }

    const nftData = await nftResponse.json();
    
    // Group NFTs by collection
    const collectionMap = new Map<string, NFTCollection>();
    
    nftData.nfts.forEach((nft: any) => {
      const collectionId = nft.collectionId || nft.contractAddress;
      if (!collectionMap.has(collectionId)) {
        collectionMap.set(collectionId, {
          name: nft.collectionName || 'Unknown Collection',
          symbol: nft.symbol || '-',
          floorPriceEth: nft.floorPrice || 0,
          floorPriceUsd: (nft.floorPrice || 0) * ethPrice,
          assetsCount: 1,
          totalValueEth: nft.floorPrice || 0,
          totalValueUsd: (nft.floorPrice || 0) * ethPrice,
          chain: nft.chain || 'ethereum',
        });
      } else {
        const collection = collectionMap.get(collectionId)!;
        collection.assetsCount += 1;
        collection.totalValueEth += nft.floorPrice || 0;
        collection.totalValueUsd += (nft.floorPrice || 0) * ethPrice;
      }
    });

    const collections = Array.from(collectionMap.values());
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