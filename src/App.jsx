import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/404";
import Provider from "./context/Provider";
import AddContactPage from "./pages/AddContactPage";

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContactPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
