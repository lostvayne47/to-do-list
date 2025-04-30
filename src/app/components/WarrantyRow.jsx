import React, { useContext } from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Status from "./Status";
import { DataContext } from "@/DataContext";
import BasicModal from "./Modal";

const WarrantyRow = ({ itemData }) => {
  const { data, setAppData } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const purchaseDate = itemData.purchaseDate
    ? new Date(itemData.purchaseDate).toLocaleDateString()
    : "-- / - / ----";
  const expiryDate = itemData.expiryDate
    ? new Date(itemData.expiryDate).toLocaleDateString()
    : "-- / - / ----";

  const getStatus = (warrantyEndDate) => {
    if (!warrantyEndDate || warrantyEndDate === "-- / - / ----") {
      return <Status themeColour={"#1976d2"} message={"No Expiry"} />;
    }
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

  function handleDelete() {
    const newData = data.filter((d) => d.id != itemData.id);
    setAppData(newData);
  }
  function handleUpdate() {
    handleOpen();
  }
  return (
    <>
      <BasicModal open={open} handleClose={handleClose} updateData={itemData} />
      <TableRow>
        <TableCell>{itemData.name}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{itemData.serial}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{purchaseDate}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{expiryDate}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{itemStatus}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton color="primary" aria-label="edit">
            <EditIcon onClick={handleUpdate} />
          </IconButton>
          <IconButton color="secondary" aria-label="delete">
            <DeleteIcon onClick={handleDelete} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default WarrantyRow;
