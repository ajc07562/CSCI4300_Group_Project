// app/recipes/add/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRecipePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    ingredients: '',
    steps: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe = {
      title: form.title,
      description: form.description,
      image: form.image,
      ingredients: form.ingredients.split('\n'),
      steps: form.steps.split('\n'),
    };

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });

      if (res.ok) {
        alert('Recipe added!');
        router.push('/recipes'); // Redirect to recipes page
      } else {
        alert('Failed to add recipe.');
      }
    } catch (err) {
      console.error('Error adding recipe:', err);
    }
  };

  return (
    <div className="container">
      <h1>Add New Recipe</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          required
        />

        <label>Ingredients (one per line)</label>
        <textarea
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          required
        />

        <label>Steps (one per line)</label>
        <textarea
          name="steps"
          value={form.steps}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">Submit Recipe</button>
      </form>
    </div>
  );
}
