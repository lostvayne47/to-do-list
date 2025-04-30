import { useContext, useState } from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import WarrantyRow from "./WarrantyRow"; // Assuming you have this component
import { DataContext } from "@/DataContext";

const sortingButtonStyle = {
  fontSize: "large",
  cursor: "pointer",
  transition: "transform 0.2s ease, color 0.2s ease",
  "&:active": {
    transform: "scale(0.9)", // Shrink the icon when clicked
    color: "#FF7300", // Optional: change color when clicked
  },
};

const WarrantyTracker = () => {
  const { data, setAppData } = useContext(DataContext);
  const [sortOrder, setSortOrder] = useState("asc"); // Track current sort order
  function sortByAlphaNum() {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setAppData(sortedData);
  }

  function sortByPurchase() {
    const sortedData = [...data].sort((a, b) => {
      const purchaseA = new Date(a.purchaseDate);
      const purchaseB = new Date(b.purchaseDate);
      return sortOrder === "asc"
        ? purchaseA - purchaseB
        : purchaseB - purchaseA;
    });
    setAppData(sortedData);
  }

  function sortByExpiry() {
    const sortedData = [...data].sort((a, b) => {
      const expiryA = new Date(a.expiryDate);
      const expiryB = new Date(b.expiryDate);
      return sortOrder === "asc" ? expiryA - expiryB : expiryB - expiryA;
    });
    setAppData(sortedData);
  }

  // Helper function to get the status priority
  function getStatusPriority(expiryDate) {
    const today = new Date();

    // Check for "No Expiry" status (i.e., expiryDate is null or some placeholder)
    if (!expiryDate || expiryDate === "-- / - / ----") {
      return 0; // Priority for "No Expiry"
    }

    const endDate = new Date(expiryDate);
    const daysLeft = (endDate - today) / (1000 * 3600 * 24); // Days difference

    if (daysLeft <= 0) return 3; // Expired
    if (daysLeft <= 3) return 2; // Due
    return 1; // Active
  }

  function sortByStatus() {
    const sortedData = [...data].sort((a, b) => {
      const statusA = getStatusPriority(a.expiryDate);
      const statusB = getStatusPriority(b.expiryDate);
      return sortOrder === "asc" ? statusA - statusB : statusB - statusA;
    });
    setAppData(sortedData); // Assuming setAppData updates the data context
  }

  // Toggle the sort order
  const handleSorting = (action) => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    switch (action) {
      case "name":
        sortByAlphaNum();
        break;
      case "number":
        sortByAlphaNum();
        break;
      case "purchase":
        sortByPurchase();
        break;
      case "expiry":
        sortByExpiry();
        break;
      case "status":
        sortByStatus();
        break;
      default:
        break;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, color: "white", borderRadius: "50px" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>
              Product{" "}
              <SwapVertIcon
                sx={sortingButtonStyle}
                onClick={() => handleSorting("name")}
              />
            </TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              Serial Number{" "}
              <SwapVertIcon
                onClick={() => handleSorting("number")}
                sx={sortingButtonStyle}
              />
            </TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              Start Date{" "}
              <SwapVertIcon
                onClick={() => handleSorting("purchase")}
                sx={sortingButtonStyle}
              />
            </TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              End Date{" "}
              <SwapVertIcon
                onClick={() => handleSorting("expiry")}
                sx={sortingButtonStyle}
              />
            </TableCell>
            <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
              Status{" "}
              <SwapVertIcon
                sx={sortingButtonStyle}
                onClick={() => handleSorting("status")}
              />
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
