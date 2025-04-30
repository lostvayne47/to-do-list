"use client"; // Ensure the component is client-side

import { Button, Container, Box, Skeleton } from "@mui/material";
import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import View from "./View";
import BasicModal from "./Modal";
import { DataContext } from "@/DataContext";
const glassStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 2,
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = useContext(DataContext);

  function handleClick(e) {
    e.preventDefault();
    const action = e.currentTarget.getAttribute("aria-label");
    console.log(action);
    switch (action) {
      case "Add":
        handleOpen();
        break;
      default:
        return;
    }
  }

  return (
    <>
      <BasicModal open={open} handleClose={handleClose} />
      <Container
        maxWidth="xl" // Sets the maxWidth
        sx={{ minWidth: 300 }} // Sets the minWidth
      >
        <Typography variant="h4" align="center" gutterBottom>
          Organise your day here
        </Typography>

        <Box display="flex" justifyContent="space-evenly" p={2}>
          <Button
            aria-label="Add"
            onClick={handleClick}
            color="success"
            sx={glassStyle}
          >
            <AddIcon fontSize="large" />
          </Button>
        </Box>
        {!data ? (
          <div className="container mx-auto">
            <div className="flex flex-col gap-5">
              <Skeleton
                variant="rectangular"
                width="100%"
                height={60}
                sx={{ bgcolor: "#4444" }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={60}
                sx={{ bgcolor: "#4444" }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={60}
                sx={{ bgcolor: "#4444" }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={60}
                sx={{ bgcolor: "#4444" }}
              />
            </div>
          </div>
        ) : (
          <View />
        )}
      </Container>
    </>
  );
}
