import React from "react";
import { toast } from "react-toastify";
export const SearchBar = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.searchInput.value;
    console.dir(keyword);
    if (keyword.length === 0) {
      toast.warning("Please type a movie name to search", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <form className="absolute w-full" onSubmit={submitHandler}>
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
