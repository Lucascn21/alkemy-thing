import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Movie = () => {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieData, setMovieData] = useState([]);
  const movieID = searchParams.get("movieID");
  const [isDataReady, setIsDataReady] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Returns a parsed object from particular data objects from the api
  const getFeature = (featureTitle, dataObject) => {
    let dataArray = [];
    if (dataObject) {
      for (const { name } of dataObject) {
        dataArray.push(name);
      }
      return {
        name: featureTitle,
        description: dataArray.toString().replaceAll(",", ", "),
      };
    }
    return undefined;
  };

  const features = [
    { name: "Popularity", description: movieData.popularity },
    getFeature("Genres", movieData.genres),
    getFeature("Production Companies", movieData.production_companies),
    getFeature("Production Countries", movieData.production_countries),
    {
      name: "Revenue",
      description: `USD: $${Intl.NumberFormat("en-US").format(
        movieData.revenue
      )}`,
    },
    { name: "Runtime", description: `${movieData.runtime} minutes` },
    { name: "Status", description: movieData.status },
    {
      name: "Vote Stats",
      description: `Average: ${movieData.vote_average} - Count: ${movieData.vote_count}`,
    },
    { name: "Release Date", description: movieData.release_date },
    {
      name: "IMDB",
      description: (
        <a href={`https://www.imdb.com/title/${movieData.imdb_id}`}>IMDB</a>
      ),
    },
  ];

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
    } else {
      const endPoint = `
    https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
      axios
        .get(endPoint)
        .then((response) => {
          setMovieData(response.data);
          setIsDataReady(true);
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
    }
  }, [movieID, navigate,token]);
  return isDataReady ? (
    <article
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieData.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="container mx-auto"
    >
      <section>
        <div className="bg-white">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <img
              alt="Poster"
              src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            ></img>
            <div className="bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-100 to-gray-300 h-full">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {movieData.original_title}
              </h2>
              <p className="mt-4 text-gray-500">{movieData.overview}</p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {features.map((feature) => (
                  <div
                    key={feature.name}
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className="font-medium text-gray-900">
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </article>
  ) : (
    <p>loading</p>
  );
};
