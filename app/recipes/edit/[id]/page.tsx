// api/recipes/edit/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditRecipe({ params }) {
  const [recipe, setRecipe] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', image: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log('Fetching from:', `/api/recipes/${params.id}`);
        const res = await fetch(`/api/recipes/${params.id}`);
        console.log('Status:', res.status);

        const data = await res.json();
        console.log('Data:', data);

        if (!res.ok || !data || data.error) {
          setError('Failed to load recipe.');
          return;
        }

        setRecipe(data);
        setForm({
          title: data.title,
          description: data.description,
          image: data.image,
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Something went wrong while loading the recipe.');
      }
    };

    fetchRecipe();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/recipes/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Recipe updated!');
      router.push('/recipes');
    } else {
      alert('Failed to update recipe.');
    }
  };

  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (!recipe) return <p className="text-center mt-6">Loading recipe...</p>;

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label className="block font-semibold mb-1">Title:</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4"
        />

        <label className="block font-semibold mb-1">Description:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-4"
        />

        <label className="block font-semibold mb-1">Image URL:</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-6"
        />

        <button type="submit" className="btn">Save Changes</button>
      </form>
    </div>
  );
}
