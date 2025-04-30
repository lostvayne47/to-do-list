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
            <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              Serial Number
            </TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              Purchase Date
            </TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              Warranty End Date
            </TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              Status
            </TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              Actions
            </TableCell>
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
