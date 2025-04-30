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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, color: "white" }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Purchase Date</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Serial Number</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              Warranty End Date
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((itemData) => (
            <WarrantyRow key={itemData.id} itemData={itemData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WarrantyTracker;
