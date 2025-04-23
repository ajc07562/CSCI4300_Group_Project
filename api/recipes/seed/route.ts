import { NextResponse } from 'next/server';
import connectMongoDB from '../../../config/mongodb';
import Recipe from '../../../models/Recipe';

export async function GET() {
  try {
    await connectMongoDB();

    // Sample recipes
    const sampleRecipes = [
      {
        title: 'Microwave Mac & Cheese',
        description: 'A creamy, cheesy comfort meal made with just a mug and a microwave.',
        image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
      },
      {
        title: 'Avocado Toast (No Toaster Needed)',
        description: 'Fresh and healthy toast with mashed avocado and optional toppings.',
        image: 'https://spoonacular.com/recipeImages/715538-556x370.jpg',
      },
      {
        title: 'Mug Omelette',
        description: 'Protein-packed omelette made quickly in a microwave mug.',
        image: 'https://spoonacular.com/recipeImages/716627-556x370.jpg',
      },
    ];

    // Insert all at once
    await Recipe.insertMany(sampleRecipes as any[]);

    return NextResponse.json({ message: 'Seeded recipes successfully!' }, { status: 200 });
  } catch (err) {
    console.error('Seeding error:', err);
    return NextResponse.json({ error: 'Failed to seed recipes' }, { status: 500 });
  }
}
