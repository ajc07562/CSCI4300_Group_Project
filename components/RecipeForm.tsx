// components/RecipeForm.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RecipeForm({ recipe, type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: recipe?.title || '',
    ingredients: recipe?.ingredients?.join('\n') || '',
    steps: recipe?.steps?.join('\n') || '',
    additionalInfo: recipe?.additionalInfo || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Here you would typically send the data to your backend
    // For now, we'll just clear the form and redirect
    setFormData({
      title: '',
      ingredients: '',
      steps: '',
      additionalInfo: ''
    });
    router.push('/recipes');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{type === 'add' ? 'Add a New Recipe' : type === 'edit' ? 'Edit Recipe' : 'Delete Recipe'}</h1>
      
      <div className="form-group">
        <label htmlFor="title">Recipe Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Enter each ingredient on a new line"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="steps">Steps and Additional Information</label>
        <textarea
          id="steps"
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          placeholder="Enter your message"
          required
        />
      </div>
      
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}