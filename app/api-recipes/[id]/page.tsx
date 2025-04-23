// app/api-recipes/[id]/page.tsx
import { notFound } from 'next/navigation';

const apiKey = '40e42b55ba2d4acc924622100dcd77ea';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Recipe ${params.id} | Campus Cravings`,
  };
}

export default async function SpoonacularRecipePage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${apiKey}`);

  if (!res.ok) return notFound();

  const data = await res.json();

  return (
    <div className="recipe-detail container">
      <h1>{data.title}</h1>
      <img src={data.image} alt={data.title} />

      <div className="recipe-section">
        <h2>Summary</h2>
        <p dangerouslySetInnerHTML={{ __html: data.summary }} />
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          {data.extendedIngredients.map((ing: any) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Instructions</h2>
        <p>{data.instructions || 'No instructions provided.'}</p>
      </div>
    </div>
  );
}
