import { PortfolioData, NFTCollection } from '../lib/types';

interface PortfolioTableProps {
  data: PortfolioData;
}

export default function PortfolioTable({ data }: PortfolioTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4 text-lg">
        Current ETH Price: ${data.ethPrice.toLocaleString()}
      </div>
      
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chain</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor Price (ETH)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor Price (USD)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value (ETH)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value (USD)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.collections.map((collection: NFTCollection, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{collection.name}</div>
                <div className="text-sm text-gray-500">{collection.symbol}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collection.chain}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collection.assetsCount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collection.floorPriceEth.toFixed(4)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${collection.floorPriceUsd.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collection.totalValueEth.toFixed(4)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${collection.totalValueUsd.toLocaleString()}</td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-semibold">
            <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Total Portfolio Value</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.totalValueEth.toFixed(4)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${data.totalValueUsd.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 