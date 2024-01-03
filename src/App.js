import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom/dist/umd/react-router-dom.development";

// component imports
import Navbar from "./Navbar";
import Login from "./Login";
import AddPatient from "./AddPatient";
import AddFiles from "./AddFiles";
import Navbar2 from "./Navbar2";
import Home from "./Home";
import PatientPage from "./PatientPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/patient" element={<PatientPage />} />
                <Route path="/upload" element={<AddFiles />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;