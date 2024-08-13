import { Typography } from "@mui/material";
export default function ReuseableHeading({children}) {
  return (
    <Typography
      variant="h3"
      color="primary"
      textAlign="center"
      className="shadow-sm text-left mt-5 text-black"
    >
      {children}
    </Typography>
  );
}
