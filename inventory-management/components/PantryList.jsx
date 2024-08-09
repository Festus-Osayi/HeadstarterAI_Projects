import Layout from "./Layout";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase_config";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Container,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { firestore } from "@/lib/firebase_config";

import { Image } from "mui-image";

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Error from "next/error";
import { formatDate } from "@/lib/formatDate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function PantryList() {
  const router = useRouter();
  /** State managements
   * Manages - inventory list, modal state, and new item input
   */
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newCategory, setNewCategory] = useState({});

  const handleOpen = async (item) => {
    setNewItemName(item?.name);
    setNewCategory(item?.category?.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewItemName("");
    setNewCategory({ name: "" });
  };

  /** Read data from database */

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setItems(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  /** Delete an item */
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const updateItem = async function () {
    const docRef = doc(firestore, "inventory", newItemName);
    const docSnap = await getDoc(docRef);
    const data = {
      name: newItemName,
      category: { name: newCategory },
    };

    try {
      if (docSnap.exists()) {
        await updateDoc(docRef, data);
        console.log("Updated successfully");
      } else {
        data.timestamp = new Date();
        data.quantity = 1;
        await setDoc(docRef, data);
        console.log("Document created successfully");
      }
      await updateInventory();
    } catch (error) {
      console.log("Error updating/creating document:", error);
    }
  };

  /** Handle the updates */
  const handleUpdate = async () => {
    try {
      updateItem();
      setNewItemName("");
      handleClose();
    } catch (error) {
      console.log("Error updating item:", error);
    }
  };

  return (
    <>
      <Layout />
      <Container maxWidth="lg">
        <Box className="mt-5 flex flex-col gap-3 md:w-[100%]">
          {/* Modal Window */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit item
              </Typography>
              <Stack width="100%" direction={"row"} spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Item"
                  variant="outlined"
                  fullWidth
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                  fullWidth
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button variant="outlined" onClick={handleUpdate}>
                  Update
                </Button>
              </Stack>
            </Box>
          </Modal>
          {/* Input */}
          <div>
            <Button
              variant="contained"
              onClick={() => router.push("/pantryitems/newpantryitems")}
            >
              Add new item
            </Button>
          </div>
          {/* Table */}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              // size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Item Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items &&
                  items.length > 0 &&
                  items.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="hover:bg-gray-200 transition ease-in-out"
                    >
                      <TableCell component="th" scope="row">
                        <Image
                          src={row.imageUrl}
                          alt={row.name}
                          width={50}
                          height={50}
                          onClick={() =>
                            router.push(`/pantryitems/${row?.name}`)
                          }
                          className="cursor-pointer rounded-md"
                        />
                      </TableCell>

                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row?.category?.name}</TableCell>
                      <TableCell align="right">{row?.quantity}</TableCell>
                      <TableCell align="right">
                        {formatDate(row?.timestamp?.toDate())}
                      </TableCell>

                      <TableCell align="right">
                        <TableCell className="flex gap-2 border-none">
                          <Button
                            variant="contained"
                            onClick={() => handleOpen(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => removeItem(row?.name)}
                            variant="contained"
                            className="bg-red-500
                          
                          "
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableCell>

                      {/* <TableCell align="right"></TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

// ...
