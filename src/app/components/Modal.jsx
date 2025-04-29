import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { DataContext } from "@/DataContext";
import BasicDatePicker from "@/app/components/DatePicker";

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
  const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  const [formData, setFormData] = useState({
    id: newId,
    checked: false,
    createdDate: new Date(),
    dueDate: null,
    desc: "",
  });

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData, // Spread the previous form data
      desc: event.target.value, // Update the `desc` field with the new value
    }));
  };
  const handleSubmit = () => {
    // Placeholder for the submit logic
    console.log("Task Submitted:", formData.desc);
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
            helperText={!formData.desc ? "Task cannot be empty" : ""} // Error message if task is empty
            value={formData.desc} // Set value to state
            onChange={handleInputChange} // Handle change in input
          />
          <BasicDatePicker setFormData={setFormData} />
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
