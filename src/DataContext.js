"use client";
import { createContext, useEffect, useState } from "react";

// Create the context
const DataContext = createContext();

// Create a Provider component
export default function DataProvider({ children }) {
  // Local Storage Key
  const STORAGE_KEY = "App-data";
  const defaultData = [
    {
      id: 0,
      purchaseDate: null,
      expiryDate: null,
      name: "JBL Headphones",
      serial: "EF235XXX",
    },
  ];
  const [data, setData] = useState([]);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored)); // safely parse
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        setData(defaultData); // fallback to default array
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  }, []);

  function setAppData(newData) {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }

  return (
    <DataContext.Provider value={{ data, setAppData }}>
      {children}
    </DataContext.Provider>
  );
}

// Export context separately if needed elsewhere
export { DataContext };
