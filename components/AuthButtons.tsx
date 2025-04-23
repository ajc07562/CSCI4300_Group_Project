// components/AuthButtons.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toggleLogin } from '../lib/data';

export default function AuthButtons() {
  const router = useRouter();

  const handleLogin = () => {
    toggleLogin();
    router.push('/recipes');
  };

  return (
    <div className="auth-buttons">
      <button onClick={handleLogin} className="btn">Login/Signup</button>
    </div>
  );
}