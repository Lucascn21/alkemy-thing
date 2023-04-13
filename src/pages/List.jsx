import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MovieList } from "../components/MovieList";
import { SearchBar } from "../components/SearchBar";
export const List = () => {
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
  });
  return (
    <main>
      {token != null && <SearchBar />}
      <MovieList />
    </main>
  );
};
