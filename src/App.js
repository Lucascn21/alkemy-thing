import { Login } from "./components/Login";

import { List } from "./components/List";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}
