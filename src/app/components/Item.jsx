"use client";
import { Box, Checkbox, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataContext } from "@/DataContext";

export default function Item({ itemData }) {
  const { data, setAppData } = useContext(DataContext);
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
          width: "65%",
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
        {itemData.createdDate
          ? new Date(itemData.createdDate).toLocaleDateString()
          : "-- / - / ----"}
      </Box>

      {/* Due Date column */}
      <Box
        sx={{
          width: "10%",
          display: "flex",
          alignItems: "center",
          textDecoration: itemData.checked ? "line-through" : "none",
        }}
      >
        {itemData.dueDate
          ? new Date(itemData.dueDate).toLocaleDateString()
          : "-- / - / ----"}
      </Box>
      {/* Edit column */}
      <Box sx={{ width: "5%" }}>
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
      <Box sx={{ width: "5%" }}>
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
