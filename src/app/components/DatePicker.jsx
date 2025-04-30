import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

export default function BasicDatePicker({ setFormData }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handler for DatePicker change event
  const handleDateChange = (newValue) => {
    const dateValue = newValue ? newValue.toDate() : null; // Convert Dayjs to Date object
    setSelectedDate(newValue); // Store the selected date as a Date object
    setFormData((prevFormData) => ({
      ...prevFormData,
      expiryDate: dateValue, // Store in form data as Date object
    }));
  };

  // Handler to clear the date
  const handleClearDate = () => {
    setSelectedDate(null); // Reset the selected date to null
    setFormData((prevFormData) => ({
      ...prevFormData,
      expiryDate: null, // Clear the due date in form data
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Expiry Date"
          value={selectedDate} // Controlled value of DatePicker
          onChange={handleDateChange} // Capture date change
          disablePast
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
