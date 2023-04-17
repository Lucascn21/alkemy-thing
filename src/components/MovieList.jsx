import React from "react";
import { Link } from "react-router-dom";
export const MovieList = ({ movieArray, addOrRemoveFav }) => {
  //Should probably make a movie component with is own itsFavorite state or something like that
  const localFavsString = localStorage.getItem("favMovies");
  const localFavsArray = localFavsString?.split(",");
  const localFavsSet = new Set(localFavsArray);
  return (
    <div className="bg-gray-700 py-24 sm:py-32 ">
      <div className=" bg-slate-300  mx-auto max-w-7xl px-6 lg:px-8">
        <div className=" mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Popular Movies
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            This is a small list of popular movies according to themoviedb.org
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {movieArray.map((movie) => (
            <article
              key={movie.id}
              className="items-stretch flex max-w-xl flex-col justify-between bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700"
            >
              <div key={movie.id} className="group relative">
                <button
                  onClick={(e) => addOrRemoveFav(e, movie.id)}
                  className="favourite-btn"
                >
                  {localFavsSet.has(movie.id.toString()) ? "🤍" : "❤️"}
                </button>
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_titles}
                    className=" object-fill h-full w-full  object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-evenly">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/movie?movieID=${movie.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {movie.original_title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {movie.release_date}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {movie.vote_average}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
