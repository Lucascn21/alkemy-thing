import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const Movie = () => {
  const features = [
    { name: "Origin", description: "Designed by Good Goods, Inc." },
    {
      name: "Material",
      description:
        "Solid walnut base with rare earth magnets and powder coated steel card cover",
    },
    { name: "Dimensions", description: '6.25" x 3.55" x 1.15"' },
    {
      name: "Finish",
      description: "Hand sanded and finished with natural oil",
    },
    { name: "Includes", description: "Wood card tray and 3 refill packs" },
    {
      name: "Considerations",
      description:
        "Made from natural materials. Grain and color vary with each item.",
    },
  ];
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieData, setMovieData] = useState([]);
  const movieID = searchParams.get("movieID");

  const [isDataReady, setIsDataReady] = useState(false);
  useEffect(() => {
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
  }, [movieID]);
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
      <section className="bg-gradient-to-r from-indigo-500 ">
        <img
          alt="Poster"
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
        ></img>
        <div className="bg-white">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {movieData.overview}
              </h2>
              <p className="mt-4 text-gray-500">
                The walnut wood card tray is precision milled to perfectly fit a
                stack of Focus cards. The powder coated steel divider separates
                active cards from new ones, or can be used to archive important
                task lists.
              </p>

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
