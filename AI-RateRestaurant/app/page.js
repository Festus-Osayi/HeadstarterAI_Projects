'use client';
import { Container, Box, Typography, Grid, Card, CardContent, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';
import WillNeed from '@/components/WillNeed';

export default function HomePage() {
  const [match, setMatches] = useState([]);

  const extractUrlsFromHtml = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const links = doc.querySelectorAll("a");
    return Array.from(links).map((link) => link.href);
  };

  useEffect(() => {
    fetch(`/api/restaurant`, {
      method: 'GET',
    })
      .then((result) => result.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error(err));
  }, []);

  return (

    <>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="60vh"
          bgcolor="success.main"
          color="white"
          textAlign="center"
          mt={2}
          borderRadius={2}
        >
          <Typography variant="h2" gutterBottom>
            Find the Best Restaurants in Town
          </Typography>
          <Typography variant="h6" gutterBottom>
            Discover, rate, and share your favorite dining spots
          </Typography>
          <Box mt={4} width="80%">
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search for a restaurant..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Featured Restaurants */}
        <Box mt={6}>
          <Typography variant="h4" gutterBottom>
            Top Rated Restaurants
          </Typography>
          <Grid container spacing={4}>
            {match.map((restaurant, index) => {
              const photoUrls = extractUrlsFromHtml(restaurant.photo_html_attr); // Extract URLs for the current restaurant

              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        {restaurant.name}
                      </Typography>

                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        A vibrant night club, café, bar, and restaurant, this establishment is a popular food and point of interest destination.
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <StarIcon sx={{ color: 'gold' }} />
                        <Typography variant="body1" ml={1}>
                          {restaurant.rating}
                        </Typography>
                      </Box>

                      {photoUrls.length > 0 && photoUrls.map((url, index) => (
                        <Button variant="contained" color="success" sx={{ mt: 2 }} key={index} href={`${url}`} target='__blank'>
                          View Details
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <WillNeed />
      </Container>
     
    </>
  );
}
