"use client"; // Ensure the component is client-side

import { Button, Container, Box, Skeleton } from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "./Modal";
import { DataContext } from "@/DataContext";
import WarrantyTracker from "./WarrantyTracker";
import sendEmail from "../EmailService";

const buttonStyle = {
  backgroundColor: "white",
  border: "1px solid white",
  borderRadius: 2,
  fontWeight: "bold",
  color: "black",
  cursor: "pointer", // Add a pointer cursor for better UX
  transition: "transform 0.2s", // Add transition for hover effect
  "&:hover": {
    transform: "scale(1.05)", // Slightly enlarge button on hover
  },
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
  function handleSend() {
    // Example usage
    sendEmail(
      "prachi.gupta19@vit.edu", // recipient email address
      "JBL Headphones", // product name
      "EF235XXX", // serial number
      "2022-01-01", // purchase date
      "2023-01-01", // expiry date
      "https://yourwebsite.com" // website URL
    );
    alert("Email Sent");
  }
  return (
    <>
      <BasicModal open={open} handleClose={handleClose} />
      <Container
        maxWidth="xl" // Sets the maxWidth
        sx={{ minWidth: 300 }} // Sets the minWidth
      >
        <Box display="flex" justifyContent="space-evenly" p={2}>
          <Button aria-label="Add" onClick={handleClick} sx={buttonStyle}>
            <AddIcon
              backgroundColor="success"
              color="success"
              fontSize="large"
            />
            New product
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
          <>
            <WarrantyTracker />
          </>
        )}
      </Container>
      <Button onClick={handleSend} sx={{ ...buttonStyle, margin: "20px" }}>
        Send
      </Button>
    </>
  );
}
