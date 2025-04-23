'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function RecipeCard({
  recipe,
  isApiRecipe = false,
  isUserRecipe = false,
}: {
  recipe: any;
  isApiRecipe?: boolean;
  isUserRecipe?: boolean;
}) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this recipe?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/recipes/${recipe._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Recipe deleted!');
        router.refresh(); // re-fetch page content
      } else {
        alert('Failed to delete recipe.');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const linkHref = isApiRecipe
    ? `/api-recipes/${recipe.id}`
    : `/recipes/${recipe._id}`;

  return (
    <div className="recipe-card">
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={300}
        height={200}
        className="rounded w-full object-cover"
        unoptimized={isApiRecipe} // for external images
      />

      <div className="recipe-card-content mt-2">
        <h3 className="text-lg font-semibold mb-1">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {recipe.description || 'No description available.'}
        </p>

        <Link href={linkHref} className="btn">
          See Recipe
        </Link>

        {isLoggedIn && isUserRecipe && (
          <div className="flex gap-2 mt-3">
            <Link href={`/recipes/edit/${recipe._id}`} className="btn btn-secondary">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-secondary">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
