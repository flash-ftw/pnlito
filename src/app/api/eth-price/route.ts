import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.coinstats.app/public/v1/coins/ethereum', {
      headers: {
        'accept': 'application/json',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch ETH price');
    }

    const data = await response.json();
    return NextResponse.json({ price: data.coin?.price || 0 });
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return NextResponse.json({ price: 0 }, { status: 500 });
  }
} 