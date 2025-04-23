// app/api/recipes/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../config/mongodb';
import Recipe from '../../../models/Recipe';

// GET /api/recipes → Fetch all recipes
export async function GET() {
  try {
    await connectMongoDB();
    const recipes = await Recipe.find({}).exec();

    return NextResponse.json(recipes);
  } catch (err) {
    console.error('GET /api/recipes error:', err);
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

// POST /api/recipes → Create a new recipe
export async function POST(req: Request) {
  try {
    const { title, description, image, ingredients, steps } = await req.json();

    if (!title || !description || !image || !ingredients || !steps) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await connectMongoDB();
    const newRecipe = await Recipe.create({
      title,
      description,
      image,
      ingredients,
      steps,
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (err) {
    console.error('POST /api/recipes error:', err);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}
