import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
const emailIsValid = (email) => {
  // eslint-disable-next-line
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const Login = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "" || password === "") {
      toast.warning("Campos vacios", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (email !== "" && !emailIsValid(email)) {
      toast.warning("Email no valido", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (email !== "challenge@alkemy.org" || password !== "react") {
      toast.error("Credenciales Invalidas", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        toast.success("Logged In successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const receivedToken = res.data.token;
        localStorage.setItem("token", receivedToken);
        navigate("/list");
      });
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/list");
    }
  });
  return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={submitHandler}>
        <label>
          <span>Email</span>
          <br />
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          <span>Password</span>
          <br />
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};
