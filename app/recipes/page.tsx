// app/recipes/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import RecipeCard from '../../components/RecipeCard';
import SearchBar from '../../components/SearchBar';
import Link from 'next/link';

export default function RecipesPage() {
  const { isLoggedIn } = useAuth();
  const [apiRecipes, setApiRecipes] = useState([]);
  const [dbRecipes, setDbRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Always fetch MongoDB recipes
  useEffect(() => {
    const fetchDB = async () => {
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();
        setDbRecipes(data);
      } catch (err) {
        console.error('Failed to fetch DB recipes:', err);
      }
    };

    fetchDB();
  }, []);

  // Only fetch Spoonacular recipes if logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchSample = async () => {
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: 'easy' }),
        });

        const data = await res.json();

        const filtered = (data.results || []).filter((r) => {
          const title = r.title?.toLowerCase() || '';
          const dishTypes = r.dishTypes || [];
          return (
            !title.includes('alcohol') &&
            !title.includes('cocktail') &&
            !title.includes('beer') &&
            !title.includes('wine') &&
            !dishTypes.includes('drink')
          );
        });

        setApiRecipes(filtered.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch API recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSample();
  }, [isLoggedIn]);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {isLoggedIn ? 'Explore & Manage Recipes' : 'Campus Cravings Recipes'}
      </h1>

      {/* Add Button */}
      {isLoggedIn && (
        <div className="text-right mb-4">
          <Link href="/recipes/add" className="btn">
            ➕ Add Recipe
          </Link>
        </div>
      )}

      {/* Search Bar */}
      {isLoggedIn && <SearchBar />}

      <div className="recipe-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* MongoDB Recipes */}
        {dbRecipes.map((r) => (
          <RecipeCard key={r._id} recipe={r} isUserRecipe={isLoggedIn} />
        ))}

        {/* Spoonacular Recipes */}
        {isLoggedIn &&
          apiRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} isApiRecipe />
          ))}

        {!loading && dbRecipes.length === 0 && (
          <p className="text-gray-500 w-full text-center col-span-full">
            No MongoDB recipes found.
          </p>
        )}
      </div>
    </div>
  );
}
