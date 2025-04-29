import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

export default function BasicDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handler for DatePicker change event
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue); // Store the selected date
    console.log(newValue);
  };

  // Handler to clear the date
  const handleClearDate = () => {
    setSelectedDate(null); // Reset the selected date to null
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Due Date"
          value={selectedDate} // Controlled value of DatePicker
          onChange={handleDateChange} // Capture date change
        />
        {/* Button to clear the date */}
        {selectedDate && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearDate}
            sx={{ marginTop: 2 }}
          >
            Clear Date
          </Button>
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}
