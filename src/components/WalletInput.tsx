import { useState } from 'react';

interface WalletInputProps {
  onSubmit: (address: string) => void;
  isLoading: boolean;
}

export default function WalletInput({ onSubmit, isLoading }: WalletInputProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSubmit(address.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your wallet address"
        disabled={isLoading}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Analyze'}
      </button>
    </form>
  );
} 