import {
  Box,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { Image } from "mui-image";
import { formatDate } from "@/lib/formatDate";
import OpenAI from "openai";
import { useEffect, useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});
export default function PantryDetails(props) {
  const [imageUrl, setImageUrl] = useState([]);
  

  return (
    <>
      <Box className="md:w-[50%] mx-auto">
        <Image
          src={props?.imageUrl}
          alt={props?.itemName}
          className="object-contain rounded-md"
        />
      </Box>
      <Box className="my-10">
        <TableContainer component={Paper} className="">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {props.name}
                </TableCell>
                <TableCell>{props?.quantity}</TableCell>
                <TableCell>{formatDate(props?.timestamp?.toDate())}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
