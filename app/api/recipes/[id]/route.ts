//app/api/recipes/[id]/route.ts
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../config/mongodb';
import Recipe from '../../../../models/Recipe';

// Validate ID helper
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// GET /api/recipes/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400 });
    }

    await connectMongoDB();
    const recipe = await Recipe.findById(params.id).exec();

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (err) {
    console.error('GET /api/recipes/:id error:', err);
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}

// PUT /api/recipes/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400 });
    }

    const { title, description, image } = await req.json();
    await connectMongoDB();

    await Recipe.findByIdAndUpdate(params.id, {
      title,
      description,
      image,
    }).exec();

    return NextResponse.json({ message: 'Recipe updated' }, { status: 200 });
  } catch (err) {
    console.error('PUT /api/recipes/:id error:', err);
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
  }
}

// DELETE /api/recipes/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ error: 'Invalid recipe ID' }, { status: 400 });
    }

    await connectMongoDB();
    await Recipe.findByIdAndDelete(params.id).exec();

    return NextResponse.json({ message: 'Recipe deleted' }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/recipes/:id error:', err);
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
  }
}
