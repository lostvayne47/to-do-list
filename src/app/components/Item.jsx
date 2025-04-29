"use client";
import { Box, Checkbox, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Item() {
  const [checked, setChecked] = useState(false);

  function handleCheck() {
    setChecked((prevChecked) => !prevChecked);
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
      <Box sx={{ width: "10%" }}>
        <Checkbox sx={{ color: "white" }} onClick={handleCheck} />
      </Box>

      {/* List Item column */}
      <Box
        sx={{
          width: "70%",
          display: "flex",
          alignItems: "center",
          textDecoration: checked ? "line-through" : "none",
        }}
      >
        List Item
      </Box>

      {/* Edit column */}
      <Box sx={{ width: "10%" }}>
        <IconButton aria-label="edit">
          <EditIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Delete column */}
      <Box sx={{ width: "10%" }}>
        <IconButton aria-label="delete">
          <DeleteIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
