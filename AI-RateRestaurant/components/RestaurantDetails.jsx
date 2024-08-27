"use client";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  styled,
  IconButton,
} from "@mui/material/";
import { green } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RestaurantsDetails(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const extractUrlsFromHtml = (htmlString) => {
    // Create a temporary DOM element to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Extract all href attributes from anchor tags
    const links = doc.querySelectorAll("a");
    return Array.from(links).map((link) => link.href);
  };

  const photoUrls = props?.photo_html_attr
    ?.map((html_string) => extractUrlsFromHtml(html_string))
    .flat();

  const [photoData] = photoUrls;

  return (
    <Card
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="Restaurants">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props?.name}
        subheader={props?.address}
      />
      <CardMedia
        component="img"
        height="194"
        image={`${
          photoData &&
          "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }`}
        alt={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props?.types?.map((type) => type)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="share"
          href={`${photoData || "/"}`}
          target="__blank"
        >
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Restaurant type:</Typography>
          <Typography paragraph>
            {props?.types?.length > 0 && props?.types?.map((type) => type)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
