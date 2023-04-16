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
  console.dir(localStorage.getItem("favMovies"));
  const favMovies = localStorage.getItem("favMovies") || new Set();

  let tempFavMovies = favMovies;
  const addOrRemoveFav = (movieId) => {
    if (!favMovies.has(movieId)) {
      tempFavMovies.add(movieId);
    } else if (favMovies.has(movieId)) {
      tempFavMovies.delete(movieId);
    }

    localStorage.setItem("favMovies", ...tempFavMovies.entries());
  };
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/popular"
            element={<List favFunction={addOrRemoveFav} />}
          />
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
