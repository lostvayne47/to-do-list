import React from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const WarrantyRow = ({ itemData, deadlineColour }) => {
  return (
    <TableRow style={{ backgroundColor: deadlineColour }}>
      <TableCell>{itemData.productName}</TableCell>
      <TableCell>{itemData.purchaseDate}</TableCell>
      <TableCell>{itemData.warrantyPeriod}</TableCell>
      <TableCell>{itemData.warrantyEndDate}</TableCell>
      <TableCell>{itemData.status}</TableCell>
      <TableCell>
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
