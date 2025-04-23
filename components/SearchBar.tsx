'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok || !data.results) {
        setError('No results found. Try again!');
        setResults([]);
        return;
      }

      setError('');
      setResults(data.results);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Something went wrong. Try again later.');
    }
  };

  const handleView = (id: number) => {
    router.push(`/api-recipes/${id}`);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a recipe..."
          className="border px-2 py-1 rounded"
        />
        <button onClick={handleSearch} className="btn">Search</button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        {results.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-2 rounded shadow w-full cursor-pointer hover:bg-gray-100"
            onClick={() => handleView(recipe.id)}
          >
            <p className="font-semibold">{recipe.title}</p>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-auto rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
