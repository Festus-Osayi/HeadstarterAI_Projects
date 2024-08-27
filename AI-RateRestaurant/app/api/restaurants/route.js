import { NextResponse } from "next/server";
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const text = url.searchParams.get('text'); // Extract text from query parameters

        if (!text) {
            return NextResponse.json({ error: 'No text provided' }, { status: 400 });
        }

        // Initialize Pinecone client
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });
        const index = pc.Index('rag').namespace('ns1'); // Replace with your actual index and namespace

        // Initialize OpenAI client
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // Create an embedding using OpenAI's API
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-3-small', // Use the correct model name
            input: text,
        });

        const embedding = embeddingResponse.data[0].embedding;

        // Query the Pinecone index using the generated embedding
        const results = await index.query({
            topK: 5, // Retrieve the top 5 closest vectors
            vector: embedding,
            includeMetadata: true, // Ensure metadata is included in the results
        });

        // Extract metadata from the results and return it
        const metadataResults = results.matches.map(match => match.metadata);

        return NextResponse.json(metadataResults);
    } catch (err) {
        console.error('Error during GET request:', err.message);
        return NextResponse.json({ error: 'An error occurred on the server' }, { status: 500 });
    }
}
