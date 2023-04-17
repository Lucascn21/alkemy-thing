import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const NavBar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  return (
    <header>
      <nav className=" h-full bg-slate-500">
        <ul className="flex space-x-4 justify-evenly content-center h-full place-items-center">
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/popular">Popular</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          {token != null && (
            <li>
              <button
                className="w-full bg-stone-400 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => {
                  sessionStorage.removeItem("token");
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
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
