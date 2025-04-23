// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import RecipeCard from '../components/RecipeCard';
import { recipes, isLoggedIn } from '../lib/data';

export default function Home() {
  const featuredRecipes = recipes.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <h1>Affordable, easy-to-make recipes tailored for UGA students in dorms and small kitchens.</h1>
      </section>

      <section className="container">
        <h2 className="text-center mb-2">View Most Popular Recipes</h2>
        
        {!isLoggedIn ? (
          <div className="recipe-grid">
            <div className="recipe-card">
              <Image src="/images/uga-logo.png" alt="UGA Logo" width={300} height={200} />
              <div className="recipe-card-content">
                <h3>Get Started</h3>
                <Link href="/login" className="btn">Login/Signup</Link>
              </div>
            </div>
            
            <div className="recipe-card">
              <Image src={featuredRecipes[0].image} alt={featuredRecipes[0].title} width={300} height={200} />
              <div className="recipe-card-content">
                <h3>View Recipes</h3>
                <p>An egg-packed protein breakfast ready in under 5 minutes.</p>
                <Link href="/recipes" className="btn">See Recipes</Link>
              </div>
            </div>

            <div className="recipe-card">
              <Image src="/images/ABOUTUS.png" alt="About Campus Cravings" width={300} height={200} />
              <div className="recipe-card-content">
                <h3>About Us</h3>
                <p>Learn more about the mission.</p>
              <Link href="/about" className="btn">Learn More</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="recipe-grid">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
