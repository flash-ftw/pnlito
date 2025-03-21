import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_COINSTATS_API_KEY;
    
    if (!apiKey) {
      console.error('CoinStats API key is not configured');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch('https://api.coinstats.app/public/v1/coins/ethereum?currency=USD', {
      headers: {
        'accept': 'application/json',
        'X-API-KEY': apiKey,
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('CoinStats API error:', errorData);
      throw new Error(`Failed to fetch ETH price: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || !data.result || !data.result.coin || typeof data.result.coin.price !== 'number') {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response format');
    }

    return NextResponse.json({ price: data.result.coin.price });
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return NextResponse.json({ error: 'Failed to fetch ETH price' }, { status: 500 });
  }
} 