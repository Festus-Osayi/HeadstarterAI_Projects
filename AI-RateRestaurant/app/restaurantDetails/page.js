'use client';
import { Container, TextField, Typography, Box, Alert, Grid } from "@mui/material";
import { useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import RestaurantsDetails from "@/components/RestaurantDetails";
import { useUser } from "@clerk/nextjs";

export default function Home() {
    const [location, setLocation] = useState("");
    const [matches, setMatches] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const { isLoaded:isLoading, isSignedIn } = useUser()

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
        libraries: ['places'],
    });

    const handleLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);
    };

    const handlePlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            const placeName = place.name || place.formatted_address; // Use the name or address as the query input

            setLocation(placeName);

            // Fetch matching metadata from the server
            fetch(`/api/restaurants?text=${encodeURIComponent(placeName)}`, {
                method: 'GET',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json(); // Parse the JSON from the response
                })
                .then((data) => {
                    console.log('Data:', data);
                    setMatches(data); // Update state with the parsed data
                })
                .catch((error) => {
                    console.error('Error fetching restaurants:', error); // Handle any errors
                });
        }
    };


    if (!isLoaded || !isLoading || !isSignedIn) {
        return (
            <Box component="div" className="flex flex-col justify-center items-center h-[50vh]">
                <Alert severity="error">Sorry! Something went wrong. Please log in and try again</Alert>
            </Box>
        );
    }

    return (
        <Container>
            <Box className="flex flex-col gap-5 my-5" component="div">
                <Typography variant="h4" className="font-bold shadow-sm">
                    Find a restaurant nearby
                </Typography>
                <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                    <TextField
                        type="search"
                        label="Enter a location"
                        className="w-full"

                        onChange={(e) => setLocation(e.target.value)}
                    />
                </Autocomplete>
            </Box>

            <Grid container spacing={2}>
                {matches.length > 0 && matches.map((match, index) => (
                    <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
                        <RestaurantsDetails {...match} />
                    </Grid>

                ))}
            </Grid>
        </Container>
    );
}
