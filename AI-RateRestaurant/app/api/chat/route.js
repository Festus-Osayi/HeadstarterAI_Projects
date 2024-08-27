import { NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'


const systemPrompt = `
You are a restaurant recommendation agent. Your task is to help users find restaurants nearby based on their location and preferences.
For every user question, you should:
1. Find the top 3 restaurants that match the user's query based on their location.
2. Use the details of these restaurants to answer the user's question.
`

export async function POST(req) {
    const data = await req.json()
    // We'll add more code here in the following steps

    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })
    const index = pc.index('rag').namespace('ns1')
    const openai = new OpenAI()

    const text = data[data.length - 1].content
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
    })

    const results = await index.query({
        topK: 5,
        includeMetadata: true,
        vector: embedding.data[0].embedding,
    })

    let resultString = ''
    results.matches.forEach((match) => {
        resultString += `
  Returned Results:
  Restaurant ID: ${match?.id}
  Restaurant ID: ${match?.metadata.name}
  Open hours: ${match?.metadata.stars}
  rating: ${match?.metadata?.rating}
  Total user rating: ${match?.metadata?.user_ratings_total}
  \n\n`
    })

    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)

    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            ...lastDataWithoutLastMessage,
            { role: 'user', content: lastMessageContent },
        ],
        model: 'gpt-3.5-turbo',
        stream: true,
    })


    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    return new NextResponse(stream)

}

// get items from pinecone

