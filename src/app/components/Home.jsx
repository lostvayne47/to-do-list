"use client"; // Ensure the component is client-side

import { Button, Container, Box, Skeleton } from "@mui/material";
import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import BasicModal from "./Modal";
import { DataContext } from "@/DataContext";
import WarrantyTracker from "./WarrantyTracker";
import sendEmail from "../EmailService";
import EmailIcon from "@mui/icons-material/Email";
import Input from "@mui/material/Input";

const buttonStyle = {
  background: "white",
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
  const [email, setEmail] = useState("");
  const websiteURL = "https://warranty-tracker.vercel.app/";

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
  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };
  // Helper function to get the status priority
  function getStatus(expiryDate) {
    const today = new Date();

    // Check for "No Expiry" status (i.e., expiryDate is null or some placeholder)
    if (!expiryDate || expiryDate === "-- / - / ----") {
      return 0; // Priority for "No Expiry"
    }

    const endDate = new Date(expiryDate);
    const daysLeft = (endDate - today) / (1000 * 3600 * 24); // Days difference

    if (daysLeft <= 0) return 3; // Expired
    if (daysLeft <= 3) return 2; // Due
    return 1; // Active
  }
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  function handleSend() {
    try {
      if (email && isValidEmail(email)) {
        data.map((d) => {
          if (getStatus(d.expiryDate) > 1) {
            sendEmail(
              email, // recipient email address
              d.name, // product name
              d.serial, // serial number
              new Date(d.purchaseDate).toLocaleDateString(), // purchase date
              new Date(d.expiryDate).toLocaleDateString(), // expiry date
              websiteURL // website URL
            );
          }
        });
        alert("Email Sent");
        setTimeout(() => {
          setEmail("");
        }, 1500);
      } else {
        alert("Please Enter Valid Email");
      }
    } catch (error) {
      console.log(error);
    }
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
            <AddIcon background="success" color="success" fontSize="large" />
            New product
          </Button>
          <div>
            <Input
              placeholder="xyz@gmail.com"
              name="email"
              value={email}
              onChange={handleInputChange}
              variant="outlined"
              required
              autoComplete="email"
              sx={{
                padding: "0.5rem",
                marginX: "1rem",
                background: "white",
                color: "black",
                borderRadius: "1rem",
              }}
            />
            <Button onClick={handleSend} sx={{ ...buttonStyle }}>
              <EmailIcon />
              Send Report
            </Button>
          </div>
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
    </>
  );
}
