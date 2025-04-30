import React, { useState, useContext } from "react";
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

export default function BasicModal({ open, handleClose }) {
  const { data, setAppData } = useContext(DataContext);
  const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  const [touched, setTouched] = useState(false);

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
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const newTask = { ...formData, id: newId };

    console.log("Task Added:", newTask);
    setAppData([...data, newTask]);

    setFormData({
      id: newId + 1, // Prepare for next task
      checked: false,
      createdDate: new Date(),
      dueDate: null,
      desc: "",
    });

    handleClose();
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
            fullWidth
            id="outlined-basic"
            label="Task"
            placeholder="Buy apples"
            variant="outlined"
            required
            error={touched && !formData.desc}
            value={formData.desc}
            onChange={handleInputChange}
            onBlur={() => setTouched(true)}
            helperText={
              <Fade in={touched && !formData.desc}>
                <span>Task cannot be empty</span>
              </Fade>
            }
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
