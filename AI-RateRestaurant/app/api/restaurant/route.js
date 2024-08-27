import { NextResponse } from "next/server";
import { Pinecone } from '@pinecone-database/pinecone';

export async function GET(req) {
    try {
        // Initialize Pinecone client
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });
        const index = pc.Index('rag').namespace('ns1'); // Replace with your actual index and namespace

        
        const defaultVector = new Array(1536).fill(0); 

        const results = await index.query({
            topK: 3, 
            vector: defaultVector, 
            includeMetadata: true, 
        });

        
        const filteredResults = results.matches
            .map(match => match.metadata) // Extract metadata from the results
            .filter(metadata => metadata.rating >= 4); // Filter based on rating

        return NextResponse.json(filteredResults);
    } catch (err) {
        console.error('Error during GET request:', err.message);
        return NextResponse.json({ error: 'An error occurred on the server' }, { status: 500 });
    }
}
