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
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return NextResponse.json({ error: 'Failed to fetch NFT data' }, { status: 500 });
  }
} 