import React from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Status from "./Status";

const WarrantyRow = ({ itemData }) => {
  const purchaseDate = itemData.purchaseDate
    ? new Date(itemData.purchaseDate).toLocaleDateString()
    : "-- / - / ----";
  const expiryDate = itemData.expiryDate
    ? new Date(itemData.expiryDate).toLocaleDateString()
    : "-- / - / ----";

  const getStatus = (warrantyEndDate) => {
    const today = new Date();
    const endDate = new Date(warrantyEndDate);
    const daysLeft = (endDate - today) / (1000 * 3600 * 24); // Days difference
    let themeColour = "";
    let message = "";
    // Expired
    if (daysLeft <= 0) {
      message = "Expired";
      themeColour = "#d32f2f";
    }
    // Expiring soon
    if (daysLeft <= 3) {
      message = "Due";
      themeColour = "#FF7300";
    } else {
      // Safe
      message = "Active";
      themeColour = "#2e7d32";
    }

    return <Status themeColour={themeColour} message={message} />;
  };

  const itemStatus = getStatus(itemData.expiryDate);
  return (
    <TableRow>
      <TableCell>{itemData.name}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{purchaseDate}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{expiryDate}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{itemData.serial}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>{itemStatus}</TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <IconButton color="primary" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default WarrantyRow;
