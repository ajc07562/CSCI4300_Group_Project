// app/recipes/[id]/page.tsx
// app/recipes/[id]/page.tsx

import { notFound } from 'next/navigation';

const fetchRecipe = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipe = await fetchRecipe(params.id);

  if (!recipe) return notFound();

  return (
    <div className="recipe-detail container">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="rounded w-full max-w-xl mb-4" />
      <p className="mb-6">{recipe.description}</p>

      {recipe.ingredients?.length > 0 && (
        <div className="recipe-section mb-6">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.steps?.length > 0 && (
        <div className="recipe-section">
          <h2>Steps</h2>
          <ol>
            {recipe.steps.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

