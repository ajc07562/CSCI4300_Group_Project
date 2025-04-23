// app/api/search/route.ts
export async function POST(req: Request) {
  const { query } = await req.json();

  const apiKey = '40e42b55ba2d4acc924622100dcd77ea';
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=10&addRecipeInformation=true&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log('Spoonacular response:', data); // 🔍

    return Response.json(data);
  } catch (err) {
    console.error('Failed Spoonacular fetch:', err);
    return Response.json({ error: 'Failed to fetch data from Spoonacular' }, { status: 500 });
  }
}




  