import DataProvider from "@/DataContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <DataProvider>
        <Navbar />
        <Home />
      </DataProvider>
    </>
  );
}
