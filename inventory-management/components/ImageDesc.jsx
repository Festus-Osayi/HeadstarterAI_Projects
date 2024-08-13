import { Grid, styled, Paper, Container, Typography, Alert } from "@mui/material";

import OpenAI from "openai";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Spinners from "./Spinners";

/** Grid component */

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

/** Open ai */

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

function ImageDesc(props) {
  const [imageRecipe, setImageRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function main() {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: "Return a clean JSON structure based on the requirement of the user. Only return JSON structure, nothing else. Do not return ```json or any unterminated string in JSON",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Create a clean JSON structure for a recipe, including a description. Ensure that the JSON structure returns only one valid free image recipe URL per category from reliable sources, avoiding lists of images, and exclude any URLs from example.com.",
              },

              {
                type: "image_url",
                image_url: {
                  url: props.imageUrl,
                },
              },
            ],
          },
        ],
      });

      const result = JSON.parse(response.choices[0].message.content);
      if (result) {
        setImageRecipe((prev) => [...prev, result]);
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
    }  
    
  }

  useEffect(() => {
    main();
  }, [props.imageUrl]);

  return (
    <Container maxWidth="lg">
      {isLoading && <Spinners />}
      <Grid container spacing={5}>
        {!isLoading &&
          imageRecipe &&
          imageRecipe.length > 0 &&
          imageRecipe.map(({ recipe }, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Item>
                <RecipeCard
                  name={recipe?.title || recipe?.name}
                  image={`${recipe.image ? recipe.image : recipe?.image?.url}`}
                  desc={recipe?.description || "No description available"}
                  instructions={
                    recipe?.instructions || "No instructions available"
                  }
                />
              </Item>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default ImageDesc;
