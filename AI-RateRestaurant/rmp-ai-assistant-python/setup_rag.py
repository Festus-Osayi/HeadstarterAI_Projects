import os
import json
import requests
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize Pinecone and OpenAI
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# Function to check and create the index
def ensure_index_exists():
    try:
        # List all indices
        indices = pc.list_indexes()

        # Check if the index exists
        if "rag" in indices:
            print(f"Index 'rag' already exists.")
        else:
            # Create index if it doesn't exist
            print(f"Index 'rag' not found. Creating...")
            pc.create_index(
                name="rag",
                dimension=1536,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1"),
            )
            print(f"Index 'rag' created successfully.")
    except Exception as e:
        print(f"Error checking or creating index: {e}")
        exit(1)


# Ensure index exists
ensure_index_exists()

# Fetch data from Google Places API
try:
    response = requests.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        params={
            "location": "37.7749,-122.4194",  # Replace with your desired location
            "radius": 1500,
            "type": "restaurant",
            "key": os.getenv("GOOGLE_PLACES_API_KEY"),
        },
    )
    response.raise_for_status()  # Raise an exception for bad status codes
    places_data = response.json().get("results", [])
    print("Fetched data from Google Places API.")
except requests.exceptions.RequestException as e:
    print(f"Error fetching data from Google Places API: {e}")
    exit(1)

processed_data = []

# Create embeddings for each place's description
for place in places_data:
    place_id = place.get("place_id")
    name = place.get("name")
    address = place.get("vicinity", "")
    price_level = place.get("price_level")
    rating = place.get("rating")
    types = place.get("types")
    user_ratings_total = place.get("user_ratings_total")
    photos = place.get("photos", [])
    opening_hours = place.get("opening_hours", {})

    photo_attributes = []
    for photo in photos:
        attributes = photo.get("html_attributions", [])
        photo_attributes.extend(attributes)
    description = f"{name} located at {address}"

    try:
        response = client.embeddings.create(
            input=description, model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
        processed_data.append(
            {
                "values": embedding,
                "id": place_id,
                "metadata": {
                    "name": name,
                    "address": address,
                    "price_level": price_level,
                    "rating": rating,
                    "types": types,
                    "user_ratings_total": user_ratings_total,
                    "photo_html_attr": photo_attributes,
                    "opening_hours": opening_hours['open_now'],
                    
                },
            }
        )
        print(f"Processed embedding for {name}.")
    except Exception as e:
        print(f"Error creating embedding for {name}: {e}")

# Insert the embeddings into the Pinecone index
try:
    index = pc.Index("rag")
    upsert_response = index.upsert(vectors=processed_data, namespace="ns1")
    print(f"Upserted count: {upsert_response['upserted_count']}")
except Exception as e:
    print(f"Error getting or upserting data into Pinecone index: {e}")
    exit(1)
