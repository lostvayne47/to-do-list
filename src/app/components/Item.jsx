"use client";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataContext } from "@/DataContext";

export default function Item({ itemData }) {
  const { data, setAppData } = useContext(DataContext);
  const startDate = itemData.purchaseDate
    ? new Date(itemData.purchaseDate).toLocaleDateString()
    : "-- / - / ----";
  const endDate = itemData.expiryDate
    ? new Date(itemData.expiryDate).toLocaleDateString()
    : "-- / - / ----";

  const today = new Date().toLocaleDateString();
  const expiryDate = new Date(itemData.expiryDate).toLocaleDateString();

  let deadlineColour;

  const diffInDays = (itemData.expiryDate - new Date()) / (1000 * 60 * 60 * 24);
  if (endDate === "-- / - / ----") {
    deadlineColour = "";
  } else if (today === expiryDate) {
    deadlineColour = "darkred"; // Due today
  } else if (diffInDays <= 3) {
    deadlineColour = "darkyellow"; // Due within 3 days
  } else {
    deadlineColour = "darkgreen"; // Due in more than 3 days
  }

  function handleEdit() {}
  function handleDelete() {}
  function handleCheck() {
    setAppData(
      data.map((d) =>
        d.id === itemData.id ? { ...d, checked: !d.checked } : d
      )
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        border: "1px solid white",
        width: "100%",
        padding: "8px",
        gap: "5px",
      }}
    >
      {/* Checkbox column */}
      <Box
        sx={{
          width: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Checkbox
          checked={itemData.checked}
          sx={{ color: "white" }}
          onClick={handleCheck}
        />
      </Box>

      {/* List Item column */}
      <Box
        sx={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          textDecoration: itemData.checked ? "line-through" : "none",
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body1">{itemData.name}</Typography>
      </Box>

      {/* List Item Serial Number column */}
      <Box
        sx={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          textDecoration: itemData.checked ? "line-through" : "none",
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body1">{itemData.serial}</Typography>
      </Box>

      {/* Created Date column */}
      <Box
        sx={{
          width: "10%",
          display: "flex",
          alignItems: "center",
          textDecoration: itemData.checked ? "line-through" : "none",
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflow: "clip",
        }}
      >
        <Typography variant="body2">{startDate}</Typography>
      </Box>

      {/* Due Date column */}
      <Box
        sx={{
          width: "10%",
          display: "flex",
          alignItems: "center",
          padding: "5px",
          marginRight: "1rem",
          justifyContent: "center",
          textDecoration: itemData.checked ? "line-through" : "none",
          background: deadlineColour,
          borderRadius: "5px",
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflow: "clip",
        }}
      >
        <Typography variant="body2">{endDate}</Typography>
      </Box>

      {/* Edit column */}
      <Box
        sx={{
          width: "7.5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="edit"
          variant="contained"
          onClick={handleEdit}
          sx={{
            backgroundColor: "success.main",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "success.dark",
            },
          }}
        >
          <EditIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Delete column */}
      <Box
        sx={{
          width: "7.5%",
          display: "flex",
          marginX: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="delete"
          variant="contained"
          onClick={handleDelete}
          sx={{
            backgroundColor: "error.main",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          <DeleteIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
