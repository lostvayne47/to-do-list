"use client";
import { Box, Checkbox, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataContext } from "@/DataContext";

export default function Item({ itemData }) {
  const { data, setAppData } = useContext(DataContext);
  const startDate = itemData.createdDate
    ? new Date(itemData.createdDate).toLocaleDateString()
    : "-- / - / ----";
  const endDate = itemData.dueDate
    ? new Date(itemData.dueDate).toLocaleDateString()
    : "-- / - / ----";

  const today = new Date().toLocaleDateString();
  const dueDate = new Date(itemData.dueDate).toLocaleDateString();

  let deadlineColour;

  const diffInDays = (itemData.dueDate - new Date()) / (1000 * 60 * 60 * 24);
  if (endDate === "-- / - / ----") {
    deadlineColour = "";
  } else if (today === dueDate) {
    deadlineColour = "error"; // Due today
  } else if (diffInDays <= 3) {
    deadlineColour = "warning"; // Due within 3 days
  } else {
    deadlineColour = "success"; // Due in more than 3 days
  }

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
      }}
    >
      {/* Checkbox column */}
      <Box sx={{ width: "5%" }}>
        <Checkbox
          checked={itemData.checked}
          sx={{ color: "white" }}
          onClick={handleCheck}
        />
      </Box>

      {/* List Item column */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          alignItems: "center",
          textDecoration: itemData.checked ? "line-through" : "none",
        }}
      >
        {itemData.desc}
      </Box>
      {/* Created Date column */}
      <Box
        sx={{
          width: "10%",
          display: "flex",
          alignItems: "center",
          textDecoration: itemData.checked ? "line-through" : "none",
        }}
      >
        {startDate}
      </Box>

      {/* Due Date column */}
      <Box
        sx={{
          width: "10%",
          display: "flex",
          alignItems: "center",
          textDecoration: itemData.checked ? "line-through" : "none",
          background: deadlineColour,
        }}
      >
        {endDate}
      </Box>
      {/* Edit column */}
      <Box sx={{ width: "7.5%" }}>
        <IconButton
          aria-label="edit"
          variant="contained"
          sx={{
            backgroundColor: "success.main",
            "&:hover": {
              backgroundColor: "success.dark", // Color when hovered
            },
          }}
        >
          <EditIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Delete column */}
      <Box sx={{ width: "7.5%" }}>
        <IconButton
          aria-label="delete"
          variant="contained"
          sx={{
            backgroundColor: "error.main",
            "&:hover": {
              backgroundColor: "error.dark", // Color when hovered
            },
          }}
        >
          <DeleteIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
