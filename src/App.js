import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";

import { Login } from "./pages/Login";
import { List } from "./pages/List";
import { Contact } from "./pages/Contact";
import { Movie } from "./pages/Movie";
import { Results } from "./pages/Results";

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
          <Route path="/movie" element={<Movie />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer />
    </>
  );
}
