import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/404";
import AddContactPage from "./pages/AddContactPage";
import DataProvider from "./context/DataProvider";

function App() {
  return ( 
    <DataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContactPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
