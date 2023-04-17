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
  const localFavs = localStorage.getItem("favMovies")?.split(",");
  const favMovies = new Set();
  //Make a function maybe
  for (const fav of localFavs) {
    localFavs !== undefined && favMovies.add(Number(fav));
  }

  const addOrRemoveFav = (e, movieId) => {
    favMovies.has(movieId) ? favMovies.delete(movieId) : favMovies.add(movieId);
    const favMoviesString = Array.from(favMovies).toString();
    favMovies.size
      ? localStorage.setItem("favMovies", favMoviesString)
      : localStorage.clear();
    e.currentTarget.textContent = isFavorite(movieId);
  };

  const isFavorite = (movieId) => {
    return favMovies.has(movieId) ? "🤍" : "❤️";
  };
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/popular"
            element={<List favFunction={addOrRemoveFav} isFav={isFavorite} />}
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
