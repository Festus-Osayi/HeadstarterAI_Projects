import { NextResponse } from 'next/server';



export async function GET() {
    const response = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`);
    const data = await response.json();

    const celebrities = data.results.map(person => ({
        name: person.name,
        imageUrl: `https://image.tmdb.org/t/p/w500${person.profile_path}`
    }));

    return NextResponse.json({ celebrities });
}
