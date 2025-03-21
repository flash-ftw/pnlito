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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">PNLito</span>
            <span className="block text-blue-600 text-3xl sm:text-4xl mt-2">NFT Portfolio Analyzer</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Track your NFT portfolio value in real-time. Enter your Ethereum wallet address below to analyze your NFT holdings, floor prices, and total portfolio value.
          </p>
        </div>

        <div className="mt-10">
          <WalletInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mt-8 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
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