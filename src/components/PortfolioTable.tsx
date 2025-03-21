import { PortfolioData, NFTCollection } from '../lib/types';

interface PortfolioTableProps {
  data: PortfolioData;
}

export default function PortfolioTable({ data }: PortfolioTableProps) {
  if (data.collections.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No NFTs found in this wallet.</p>
        <p className="text-sm text-gray-400 mt-2">Try another wallet address or make sure you have NFTs in your wallet.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow">
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-lg font-medium text-blue-900">
          Current ETH Price: ${data.ethPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Total Portfolio Value (ETH)</div>
            <div className="text-xl font-bold">{data.totalValueEth.toFixed(4)} ETH</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Total Portfolio Value (USD)</div>
            <div className="text-xl font-bold">${data.totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chain</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.collections.map((collection: NFTCollection, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{collection.name}</div>
                  <div className="text-sm text-gray-500">{collection.symbol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {collection.chain}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {collection.assetsCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{collection.floorPriceEth.toFixed(4)} ETH</div>
                  <div className="text-sm text-gray-500">${collection.floorPriceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{collection.totalValueEth.toFixed(4)} ETH</div>
                  <div className="text-sm text-gray-500">${collection.totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 