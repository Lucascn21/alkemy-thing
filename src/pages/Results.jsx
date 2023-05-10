import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchBar } from "../components/SearchBar";
import axios from "axios";
import { Pagination } from "../components/Pagination";

export const Results = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [responseResults, setResponseResults] = useState([]);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("movie");
  const pageQuery = searchParams.get("page");

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
        https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${searchQuery}&page=${pageQuery}`;
      axios
        .get(endPoint)
        .then((response) => {
          setResponseResults(response.data);
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
  }, [navigate, pageQuery, token, searchQuery]);

  return (
    <>
      <main className="grid grid-rows-[3rem_minmax(5rem,_1fr)]">
        {token != null && <SearchBar />}
        <section className="justify-self-center">
          <h2>Results Section</h2>
          <p>You are looking for: {searchQuery}</p>
          {responseResults.total_results}
        </section>
        <section className="scroll-smooth snap-y touch-pan-y overflow-x-auto scrollbar-hide grid md:grid-cols-1 lg:grid-cols-3 ">
          {responseResults.total_results ? (
            responseResults.results.map((movie) => (
              <article key={movie.id} className=" m-4">
                <Link to={`http://localhost:3000/movie?movieID=${movie.id}`}>
                  <img
                    className="h-full"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : "/assets/img/noimage.jpg"
                    }
                    alt="movieimg"
                  />
                </Link>
              </article>
            ))
          ) : (
            <article className="col-start-2 m-4">
              <img src="assets/img/noresults.jpg" alt="movieimg" />
            </article>
          )}
        </section>
        <Pagination data={responseResults} />
      </main>
    </>
  );
};
