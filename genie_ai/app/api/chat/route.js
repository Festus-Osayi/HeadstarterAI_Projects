import { getMongoClient, testDatabaseConnection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Parse request body
        const body = await req.json();

        // Sanitize user input
        const userData = {
            firstName: body.firstName.trim(),
            lastName: body.lastName.trim(),
            email: body.email.trim(),
            phone: body.phone.trim(),
            message: body.message.trim()
        };

        // Connect to MongoDB instance
        await testDatabaseConnection();

        // Get MongoDB client
        const client = await getMongoClient();
        const db = client.db("genieai"); // Replace with your actual database name

        // Create new user
        try {
            const result = await db.collection("users").insertOne(userData);
            return NextResponse.json({ id: result.insertedId, ...userData });
        } catch (error) {
            console.error("Error creating new user", error);
            return NextResponse.json({ error: "Failed to create new user" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error processing request", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}