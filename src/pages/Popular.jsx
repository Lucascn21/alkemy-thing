import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MovieList } from "../components/MovieList";
export const Popular = ({ addOrRemoveFav }) => {
  const [movieArray, setMovieArray] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      toast.warning("Log in, please", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    }
    const endPoint = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
    axios
      .get(endPoint)
      .then((response) => {
        setMovieArray(response.data.results);
      })
      .catch((error) => {
        toast.error(error.toString(), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }, []);

  return movieArray.length === 0 ? (
    <h2>No results.</h2>
  ) : (
    <MovieList
      listSection="Popular"
      addOrRemoveFav={addOrRemoveFav}
      movieArray={movieArray}
    />
  );
};
