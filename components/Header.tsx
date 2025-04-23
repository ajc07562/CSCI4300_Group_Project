'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, userName, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Image src="/images/logo.png" alt="Campus Cravings Logo" width={30} height={30} />
          <Link href="/" className="logo-text">Campus Cravings</Link>
        </div>

        {/* Nav Links */}
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/recipes">Recipes</Link>

          {isLoggedIn && userName && (
            <span className="welcome">Welcome, {userName}!</span>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn">Logout</button>
          ) : (
            <>
              <Link href="/login" className="btn">Login</Link>
              <Link href="/signup" className="btn ml-2">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
