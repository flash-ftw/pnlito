'use client';

import { useState } from 'react';
import WalletInput from '../components/WalletInput';
import PortfolioTable from '../components/PortfolioTable';
import { getNFTPortfolio } from '../lib/api';
import { PortfolioData } from '../lib/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  const handleSubmit = async (walletAddress: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getNFTPortfolio(walletAddress);
      setPortfolioData(data);
    } catch (err) {
      setError('Failed to fetch portfolio data. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          NFT Portfolio Analyzer
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your wallet address to analyze your NFT portfolio value
        </p>

        <WalletInput onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {portfolioData && !error && (
          <div className="mt-8">
            <PortfolioTable data={portfolioData} />
          </div>
        )}
      </div>
    </main>
  );
} 