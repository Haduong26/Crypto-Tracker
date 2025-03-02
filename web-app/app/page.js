'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const fetchCrypto = async () => {
  const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1');
  return response.data;
};

export default function Home() {
  const [search, setSearch] = useState('');
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['crypto'],
    queryFn: fetchCrypto,
  });

  const filteredCrypto = data?.filter(crypto => 
    crypto.name.toLowerCase().includes(search.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(search.toLowerCase())
  )?.slice(0, 5);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <ArrowPathIcon className="h-12 w-12 animate-spin text-blue-500"/>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      Error: {error.message}
    </div>
  );

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Crypto Tracker 🚀</h1>
      
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search crypto..."
            className="w-full p-3 pl-10 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-4 text-gray-400"/>
        </div>
        <button
          onClick={refetch}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <ArrowPathIcon className="h-5 w-5"/>
          Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {filteredCrypto?.map((crypto) => (
          <div key={crypto.id} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={crypto.image} alt={crypto.name} className="h-10 w-10"/>
                <div>
                  <h2 className="text-xl font-semibold">{crypto.name}</h2>
                  <p className="text-gray-500 uppercase">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium">${crypto.current_price.toLocaleString()}</p>
                <p className={crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {crypto.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}