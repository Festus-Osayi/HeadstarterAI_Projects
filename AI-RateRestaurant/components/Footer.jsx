import { Box, Typography } from "@mui/material";
export default function Footer() {
  return (
    <Box mt={8} py={4} bgcolor="grey.200" textAlign="center">
      <Typography variant="body2" color="textSecondary">
        © 2024 Restaurant Ratings. All rights reserved.
      </Typography>
    </Box>
  );
}
