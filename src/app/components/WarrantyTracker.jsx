import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import WarrantyRow from "./WarrantyRow"; // Import the WarrantyRow component
import { DataContext } from "@/DataContext";

const WarrantyTracker = () => {
  const { data } = useContext(DataContext);
  const getDeadlineColour = (warrantyEndDate) => {
    const today = new Date();
    const endDate = new Date(warrantyEndDate);
    const daysLeft = (endDate - today) / (1000 * 3600 * 24); // Days difference

    if (daysLeft <= 0) return "red"; // Expired
    if (daysLeft <= 3) return "yellow"; // Expiring soon
    return "green"; // Safe
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Purchase Date</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell>Warranty End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((itemData) => (
            <WarrantyRow
              key={itemData.id}
              itemData={itemData}
              deadlineColour={getDeadlineColour(itemData.warrantyEndDate)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WarrantyTracker;
