import React from "react";

import { MovieList } from "../components/MovieList";

export const Favorites = ({ addOrRemoveFav }) => {
  const localFavsString = localStorage.getItem("favMovies");
  const localFavsArray = JSON.parse(localFavsString);
  const localFavsObj = localFavsArray?.map((fav) => {
    return JSON.parse(fav);
  });

  return (
    <MovieList
      listSection="Favorites"
      movieArray={localFavsObj || []}
      addOrRemoveFav={addOrRemoveFav}
    />
  );
};
