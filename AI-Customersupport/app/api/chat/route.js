import { NextResponse } from "next/server";
import OpenAI from 'openai';

async function fetchCelebrityImage(celebrityName) {
    const response = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(celebrityName)}`);
    const data = await response.json();
    const celebrity = data.results[0];
    
    return {
        name: celebrity.name,
        imageUrl: `https://image.tmdb.org/t/p/w500${celebrity.profile_path}`
    };
}

export async function POST(req) {
    const openai = new OpenAI();
    const data = await req.json();

    const { selectedCelebrity, messages } = data;

    // Fetch the image for the selected celebrity
    const celebrity = await fetchCelebrityImage(selectedCelebrity);

    const systemPrompt = `
    You are ${celebrity.name} and will answer all questions as ${celebrity.name}. Your responses should be consistent with the personality and knowledge of ${celebrity.name}.
    `;

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        model: 'gpt-4o',
        stream: false,
    });

    const content = completion.choices[0]?.message?.content || '';

    return NextResponse.json({
        content,
        celebrityName: celebrity.name,
        imageUrl: celebrity.imageUrl
    });
}
