import React from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Status from "./Status";

const WarrantyRow = ({ itemData }) => {
  const purchaseDate = itemData.createdDate
    ? new Date(itemData.createdDate).toLocaleDateString()
    : "-- / - / ----";
  const expiryDate = itemData.dueDate
    ? new Date(itemData.dueDate).toLocaleDateString()
    : "-- / - / ----";

  const getStatus = (warrantyEndDate) => {
    const today = new Date();
    const endDate = new Date(warrantyEndDate);
    const daysLeft = (endDate - today) / (1000 * 3600 * 24); // Days difference
    let themeColour = "";
    let message = "";
    if (daysLeft <= 0) {
      message = "Expired";
      themeColour = "#BA2525";
    } // Expired
    if (daysLeft <= 3) {
      message = "Due";
      themeColour = "#FFB347";
    } // Expiring soon
    else {
      message = "Active";
      themeColour = "#124912";
    } // Safe

    return <Status themeColour={"#124912"} message={message} />;
  };

  const itemStatus = getStatus(itemData.dueDate);
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
