import React, { useEffect } from "react";
import { MovieList } from "../components/MovieList";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Favorites = ({ addOrRemoveFav }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const localFavsString = localStorage.getItem("favMovies");
  const localFavsArray = JSON.parse(localFavsString);
  const localFavsObj = localFavsArray?.map((fav) => {
    return JSON.parse(fav);
  });
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
    if (!localFavsArray) {
      toast.warning("No favorites, go ❤️ some movies", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/popular");
    }
  });

  return (
    <MovieList
      listSection="Favorites"
      movieArray={localFavsObj || []}
      addOrRemoveFav={addOrRemoveFav}
    />
  );
};
