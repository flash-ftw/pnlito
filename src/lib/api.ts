import { PortfolioData, NFTCollection } from './types';

export async function getEthPrice(): Promise<number> {
  try {
    const response = await fetch('/api/eth-price');
    
    if (!response.ok) {
      throw new Error('Failed to fetch ETH price');
    }

    const data = await response.json();
    return data.price || 0;
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
    const nftResponse = await fetch(`/api/nft-portfolio/${walletAddress}`);

    if (!nftResponse.ok) {
      throw new Error('Failed to fetch NFT data');
    }

    const nftData = await nftResponse.json();
    
    // Ensure we have NFT data
    if (!nftData || !Array.isArray(nftData)) {
      console.error('Invalid NFT data format:', nftData);
      throw new Error('Invalid NFT data format');
    }

    // Group NFTs by collection
    const collectionMap = new Map<string, NFTCollection>();
    
    nftData.forEach((nft: any) => {
      if (!nft || typeof nft !== 'object') return;

      const collectionId = nft.collectionId || nft.contractAddress || 'unknown';
      const floorPrice = parseFloat(nft.floorPrice) || 0;
      
      if (!collectionMap.has(collectionId)) {
        collectionMap.set(collectionId, {
          name: nft.collectionName || nft.name || 'Unknown Collection',
          symbol: nft.symbol || '-',
          floorPriceEth: floorPrice,
          floorPriceUsd: floorPrice * ethPrice,
          assetsCount: 1,
          totalValueEth: floorPrice,
          totalValueUsd: floorPrice * ethPrice,
          chain: nft.chain || 'ethereum',
        });
      } else {
        const collection = collectionMap.get(collectionId)!;
        collection.assetsCount += 1;
        collection.totalValueEth += floorPrice;
        collection.totalValueUsd += floorPrice * ethPrice;
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