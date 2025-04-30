import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { DataContext } from "@/DataContext";
import BasicDatePicker from "@/app/components/DatePicker";
import { Fade } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ updateData = null, open, handleClose }) {
  const { data, setAppData } = useContext(DataContext);

  const [nameTouched, setNameTouched] = useState(false);
  const [serialTouched, setSerialTouched] = useState(false);

  const defaultFormData = {
    id: null,
    purchaseDate: null,
    expiryDate: null,
    name: "",
    serial: "",
  };

  const [formData, setFormData] = useState(updateData || defaultFormData);

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous form data
      [event.target.name]: event.target.value, // Update the field with the new value
    }));
  };

  const handleSubmit = () => {
    if (!updateData) {
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newProduct = { ...formData, id: newId };
      console.log("Product Added:", newProduct);
      setAppData([...data, newProduct]);
      setFormData(defaultFormData);
    } else {
      const updatedProduct = data.map((d) => {
        if (d.id === formData.id) {
          return { ...d, ...formData }; // Spread existing properties and update with formData
        }
        return d; // Return the original item if the id doesn't match
      });
      setAppData(updatedProduct); // Updated line: directly set the updated array
    }

    handleClose();
  };
  // Watch open: when it becomes false, reset everything
  useEffect(() => {
    if (!open) {
      setNameTouched(false);
      setSerialTouched(false);
    }
  }, [open]); // dependency array => runs whenever open changes

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, color: "black", bgcolor: "background.paper" }}>
          <Typography mb={2} id="modal-modal-title" variant="h6" component="h2">
            Enter Product Details
          </Typography>
          <TextField
            fullWidth
            name="name"
            id="outlined-basic"
            label="Product Name"
            placeholder="JBL Headphones"
            variant="outlined"
            required
            error={nameTouched && !formData.name}
            value={formData.name}
            onChange={handleInputChange}
            onBlur={() => setNameTouched(true)}
            helperText={
              <Fade in={nameTouched && !formData.name}>
                <span>Product Name cannot be empty</span>
              </Fade>
            }
          />
          <TextField
            fullWidth
            name="serial"
            id="outlined-basic"
            label="Product Serial Number"
            placeholder="XX67EF7H"
            variant="outlined"
            required
            error={serialTouched && !formData.serial}
            value={formData.serial}
            onChange={handleInputChange}
            onBlur={() => setSerialTouched(true)}
            helperText={
              <Fade in={serialTouched && !formData.serial}>
                <span>Serial Number cannot be empty</span>
              </Fade>
            }
          />
          <BasicDatePicker
            setFormData={setFormData}
            productDate={"Purchase"}
            disableFuture={true}
            existingDate={formData.purchaseDate}
          />
          <BasicDatePicker
            setFormData={setFormData}
            productDate={"Expiry"}
            disablePast={true}
            existingDate={formData.expiryDate}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit} // Call submit function
            sx={{ marginTop: "1rem" }}
          >
            Add Task
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
