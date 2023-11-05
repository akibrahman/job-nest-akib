import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import logo from "/logo.png";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-gradient-to-r from-[#BC6AE7] to-[#6D3EB7]">
      <nav className="w-[85%] mx-auto flex items-center justify-between py-4 text-white font-semibold">
        <img
          className="w-32 bg-white px-3 py-2 rounded-full"
          src={logo}
          alt=""
        />
        <div className="flex items-center gap-4">
          <Link to="/">
            <p>Home</p>
          </Link>
          <p>All Jobs</p>
          {user ? (
            <>
              {" "}
              <p>Add a Job</p>
              <p>My Jobs</p>
              <p>Applied Jobs</p>
              <Link to="/profile">
                <img
                  className="w-9 h-9 rounded-full"
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co/CnXgXTB/no.webp"
                  }
                  alt=""
                />
              </Link>
            </>
          ) : (
            <Link to="login">
              <p>Login</p>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
