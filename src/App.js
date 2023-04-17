import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";

import { Login } from "./pages/Login";
import { Popular } from "./pages/Popular";
import { Contact } from "./pages/Contact";
import { Movie } from "./pages/Movie";
import { Results } from "./pages/Results";
import { Favorites } from "./pages/Favorites";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const localFavs = localStorage.getItem("favMovies");
  const favMoviesSet = new Set(JSON.parse(localFavs));
  const addOrRemoveFav = (e, movie) => {
    const { poster_path, id, original_title } = movie;
    const movieData = { poster_path, id, original_title };
    const movieDataString = JSON.stringify(movieData);
    favMoviesSet.has(movieDataString)
      ? favMoviesSet.delete(movieDataString)
      : favMoviesSet.add(movieDataString);
    const favMoviesStringifiedArray = JSON.stringify(Array.from(favMoviesSet));
    favMoviesSet.size
      ? localStorage.setItem("favMovies", favMoviesStringifiedArray)
      : localStorage.clear();
    e.currentTarget.textContent = isFavorite(movieData);
  };

  const isFavorite = (movie) => {
    const movieDataString = JSON.stringify(movie);
    return favMoviesSet.has(movieDataString) ? "🤍" : "❤️";
  };
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/popular"
            element={<Popular addOrRemoveFav={addOrRemoveFav} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/movie"
            element={<Movie addOrRemoveFav={addOrRemoveFav} />}
          />
          <Route
            path="/favorites"
            element={<Favorites addOrRemoveFav={addOrRemoveFav} />}
          />
          <Route path="/results" element={<Results />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer />
    </>
  );
}
