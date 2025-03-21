import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const response = await fetch(`https://api.coinstats.app/public/v1/nfts/address/${params.address}`, {
      headers: {
        'accept': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NFT data');
    }

    const data = await response.json();
    
    // Check if we have the expected data structure
    if (!data || !Array.isArray(data.result)) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response format');
    }

    // Transform the data to match our expected format
    const nfts = data.result.map((nft: any) => ({
      collectionId: nft.contractAddress,
      contractAddress: nft.contractAddress,
      collectionName: nft.collectionName || nft.name || 'Unknown Collection',
      name: nft.name,
      symbol: nft.symbol || '-',
      floorPrice: nft.floorPrice || 0,
      chain: nft.chain || 'ethereum'
    }));

    return NextResponse.json(nfts);
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return NextResponse.json({ error: 'Failed to fetch NFT data' }, { status: 500 });
  }
} 