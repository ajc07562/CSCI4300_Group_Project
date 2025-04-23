// models/Recipe.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
}

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: [String], // Array of ingredients
  steps: [String],       // Array of steps
});

export default mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', recipeSchema);


