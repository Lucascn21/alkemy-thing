import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";

import { Login } from "./pages/Login";
import { List } from "./pages/List";
import { Contact } from "./pages/Contact";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/list" element={<List />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer />
    </>
  );
}
