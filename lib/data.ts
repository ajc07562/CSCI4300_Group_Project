// lib/data.js

// Simulated login state
export let isLoggedIn = false;

// Toggle function to simulate logging in/out
export function toggleLogin() {
  isLoggedIn = !isLoggedIn;
}

// Full list of recipes
export const recipes = [
  {
    id: 1,
    title: "Microwave Mac & Cheese",
    image: "/images/recipe-images/mac-cheese.jpg",
    description: "A creamy, cheesy comfort meal made with just a mug and a microwave.",
    ingredients: [
      "½ cup elbow macaroni",
      "½ cup water",
      "¼ cup shredded cheddar cheese",
      "¼ cup milk"
    ],
    steps: [
      "Add macaroni and water to a large mug.",
      "Microwave for 2-3 minutes, stirring halfway.",
      "Add milk and cheese, stir, and microwave for 30 more seconds until creamy."
    ],
    additionalInfo: "No stovetop required. Stir well to prevent clumps."
  },
  {
    id: 2,
    title: "Avocado Toast (No Toaster Needed)",
    image: "/images/recipe-images/avocado-toast.jpg",
    description: "Fresh and healthy toast with mashed avocado and optional toppings.",
    ingredients: [
      "1 slice bread",
      "1 ripe avocado",
      "Salt, pepper, red pepper flakes (optional)"
    ],
    steps: [
      "Toast bread using pan or oven.",
      "Mash avocado in a bowl and season.",
      "Spread onto toast and top as desired."
    ],
    additionalInfo: "Add a fried egg or tomatoes for extra flavor."
  },
  {
    id: 3,
    title: "Mug Omelette",
    image: "/images/recipe-images/mug-omelet.jpg",
    description: "Protein-packed omelette made quickly in a microwave mug.",
    ingredients: [
      "2 eggs",
      "Chopped veggies (spinach, onion, tomato)",
      "Salt and pepper"
    ],
    steps: [
      "Crack eggs into a mug and beat well.",
      "Add veggies and seasoning.",
      "Microwave for 1-2 minutes until eggs are set."
    ],
    additionalInfo: "Use a large mug and stir halfway to ensure even cooking."
  },
  {
    id: 4,
    title: "Tortilla Pizza",
    image: "/images/recipe-images/tortilla-pizza.jpg",
    description: "Quick personal pizza made with a tortilla base.",
    ingredients: [
      "1 flour tortilla",
      "2 tbsp tomato sauce",
      "¼ cup shredded mozzarella",
      "Toppings (pepperoni, veggies, etc.)"
    ],
    steps: [
      "Preheat oven to 400°F or use toaster oven.",
      "Spread sauce on tortilla, add cheese and toppings.",
      "Bake for 5-7 minutes until crispy."
    ],
    additionalInfo: "Use parchment paper for easy cleanup."
  },
  {
    id: 5,
    title: "Overnight Oats",
    image: "/images/recipe-images/overnight-oats.jpg",
    description: "No-cook breakfast prepared the night before.",
    ingredients: [
      "½ cup rolled oats",
      "½ cup milk (or dairy-free)",
      "1 tbsp chia seeds",
      "Fruit and honey to top"
    ],
    steps: [
      "Mix oats, milk, and chia in a jar.",
      "Refrigerate overnight.",
      "Top with fruit and sweetener before eating."
    ],
    additionalInfo: "Lasts 2–3 days in the fridge."
  },
  {
    id: 6,
    title: "Banana Peanut Butter Wrap",
    image: "/images/recipe-images/banana-wrap.jpg",
    description: "Quick, nutritious snack with just 3 ingredients.",
    ingredients: [
      "1 tortilla",
      "2 tbsp peanut butter",
      "1 banana"
    ],
    steps: [
      "Spread peanut butter on tortilla.",
      "Place banana on top and roll it up.",
      "Slice into pieces or eat whole."
    ],
    additionalInfo: "Use almond butter or Nutella for variety."
  }
];
