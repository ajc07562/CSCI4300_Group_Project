'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toggleLogin } from '../../lib/data';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    yearAndDorm: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted with data:', formData);

    login(formData.firstName); // sets userName into AuthContext
    toggleLogin(); // if you still want this logic
    router.push('/recipes');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Login/Signup</h1>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearAndDorm">Year and Dorm</label>
          <input
            type="text"
            id="yearAndDorm"
            name="yearAndDorm"
            value={formData.yearAndDorm}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}
