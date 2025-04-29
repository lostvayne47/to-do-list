import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { DataContext } from "@/DataContext";

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

export default function BasicModal({ open, handleClose }) {
  const { data, setAppData } = useContext(DataContext);
  const [formData, setFormData] = useState("");

  const handleInputChange = (event) => {
    setFormData(event.target.value); // Update state when input changes
  };
  const handleSubmit = () => {
    // Placeholder for the submit logic
    console.log("Task Submitted:", formData);
    // Reset task input after submit (optional)
    setFormData("");
    handleClose(); // Close the modal after submission (if you want)
  };
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
            Describe your task
          </Typography>
          <TextField
            m={2}
            p={2}
            fullWidth={true}
            id="outlined-basic"
            label="Task"
            placeholder="Buy apples"
            variant="outlined"
            required
            helperText={!formData ? "Task cannot be empty" : ""} // Error message if task is empty
            value={formData} // Set value to state
            onChange={handleInputChange} // Handle change in input
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
