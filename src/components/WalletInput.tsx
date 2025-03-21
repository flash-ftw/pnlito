import { useState } from 'react';

interface WalletInputProps {
  onSubmit: (address: string) => void;
  isLoading: boolean;
}

export default function WalletInput({ onSubmit, isLoading }: WalletInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const validateAddress = (address: string): boolean => {
    // Basic Ethereum address validation
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethAddressRegex.test(address);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedAddress = address.trim();
    
    if (!trimmedAddress) {
      setError('Please enter a wallet address');
      return;
    }

    if (!validateAddress(trimmedAddress)) {
      setError('Please enter a valid Ethereum wallet address');
      return;
    }

    setError('');
    onSubmit(trimmedAddress);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setError('');
            }}
            placeholder="Enter your Ethereum wallet address (0x...)"
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              error 
                ? 'border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {error && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
            isLoading || !address.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing...</span>
            </div>
          ) : (
            'Analyze Portfolio'
          )}
        </button>
      </form>
    </div>
  );
} 