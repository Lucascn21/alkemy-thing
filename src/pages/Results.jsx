import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchBar } from "../components/SearchBar";
import axios from "axios";

export const Results = () => {
  //https://api.themoviedb.org/3/search/movie?api_key=47a7428f4d491180fc7b2642887b2dca&query=spider
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("movie");
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
        https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${searchQuery}`;
      axios
        .get(endPoint)
        .then((response) => {
          setSearchResults(response.data.results);
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
  });

  return (
    <>
      <main className="grid grid-rows-[3rem_minmax(5rem,_1fr)]">
        {token != null && <SearchBar />}
        <section className="justify-self-center">
          <h2>Results Section</h2>
          <p>You are looking for: {searchQuery}</p>
          {searchResults.length}
        </section>
        <section className="scroll-smooth snap-y touch-pan-y overflow-x-auto scrollbar-hide grid md:grid-cols-1 lg:grid-cols-3 ">
          {searchResults.length ? (
            searchResults.map((movie) => (
              <article key={movie.id} className=" m-4">
                <Link to="http://localhost:3000/movie?movieID=677179">
                  <img
                    className=""
                    src="https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
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
      </main>
    </>
  );
};
