import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom/dist/umd/react-router-dom.development";

// component imports
import Navbar from "./Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AddPatient from "./AddPatient";
import AddFiles from "./AddFiles";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addPatient" element={<AddPatient />} />
          <Route path="/addFiles" element={<AddFiles />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;