import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.searchInput.value.trim();
    if (keyword.length < 1) {
      toast.warning(
        "Please type a movie name to search, at least 1 character",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else {
      navigate(`/results?movie=${keyword}`);
    }
  };
  return (
    <form className=" w-full" onSubmit={submitHandler}>
      <input
        name="searchInput"
        placeholder="Search for a movie here..."
        className="w-5/6 text-center bg-gradient-to-r from-green-500 to-orange-500"
      />
      <button className="w-1/6 bg-sky-500 hover:bg-sky-700" type="submit">
        Submit
      </button>
    </form>
  );
};
