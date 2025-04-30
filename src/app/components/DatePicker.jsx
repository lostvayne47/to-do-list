import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import dayjs from "dayjs";

export default function BasicDatePicker({
  setFormData,
  productDate,
  existingDate = null,
  disablePast = false,
  disableFuture = false,
}) {
  const [selectedDate, setSelectedDate] = useState(
    existingDate ? dayjs(existingDate) : null
  );

  // Handler for DatePicker change event
  const handleDateChange = (newValue) => {
    const dateValue = newValue ? newValue.toDate() : null; // Convert Dayjs to Date object
    setSelectedDate(newValue); // Store the selected date as a Date object
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${productDate.toLowerCase()}Date`]: dateValue, // Store in form data as Date object
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
      <DemoContainer components={["DatePicker"]} sx={{ marginTop: "1rem" }}>
        <DatePicker
          label={productDate}
          value={selectedDate} // Controlled value of DatePicker
          onChange={handleDateChange} // Capture date change
          disablePast={disablePast}
          disableFuture={disableFuture}
        />
        {/* Button to clear the date */}
        {selectedDate && (
          <Button variant="outlined" color="error" onClick={handleClearDate}>
            Clear Date
          </Button>
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}
