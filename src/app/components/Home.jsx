"use client"; // Ensure the component is client-side

import { Button, Container, Box } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import View from "./View";
const glassStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 2,
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
};

export default function Home() {
  function handleClick(e) {
    e.preventDefault();
    const action = e.currentTarget.getAttribute("aria-label");
    console.log(action);
  }

  return (
    <>
      <Container maxWidth="sm">
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
        <View />
      </Container>
    </>
  );
}
