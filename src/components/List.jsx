import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const List = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>List</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          toast.success("Logged out successfully", {
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
        }}
      >
        logout
      </button>
    </>
  );
};
