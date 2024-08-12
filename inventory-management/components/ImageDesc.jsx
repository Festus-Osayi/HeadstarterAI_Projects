import { Grid, styled, Paper, Container } from "@mui/material";

import OpenAI from "openai";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

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
                text: "Create a clean JSON structure for a recipe, including a description. Ensure that the JSON structure returns only one valid free image URL per category from reliable sources, avoiding lists of images, and exclude any URLs from example.com.",
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
      console.log(`After parsing, result is ${result}`);
      if (result) {
        setImageRecipe((prev) => [...prev, result]);
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    main();
  }, [props.imageUrl]);

  console.log({ imageRecipe });
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {imageRecipe &&
          imageRecipe.length > 0 &&
          imageRecipe.map(({ recipe }, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Item>
                <RecipeCard
                  name={recipe?.title || recipe?.name}
                  image={recipe?.image || recipe?.image?.url}
                  desc={recipe?.description}
                  instructions={recipe?.instructions}
                />
              </Item>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default ImageDesc;
