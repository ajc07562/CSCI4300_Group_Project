// app/recipes/delete/[id]/page.js
'use client';
import RecipeForm from '../../../../components/RecipeForm';
import { recipes } from '../../../../lib/data';
import { useParams } from 'next/navigation';

export default function DeleteRecipe() {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return <RecipeForm recipe={recipe} type="delete" />;
}