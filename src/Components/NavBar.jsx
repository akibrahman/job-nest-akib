import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import logo from "/logo.png";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-gradient-to-r from-[#BC6AE7] to-[#6D3EB7]">
      <nav className="w-[85%] mx-auto flex items-center justify-between py-3 text-white font-semibold">
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
          {user && (
            <>
              <Link to="add-a-job">
                <p>Add a Job</p>
              </Link>
              <p>My Jobs</p>
              <p>Applied Jobs</p>
            </>
          )}
        </div>
        <div>
          {user ? (
            <Link
              className="flex items-center gap-3 border px-1 py-1 rounded-full"
              to="/profile"
            >
              <img
                className="w-8 h-8 rounded-full"
                src={
                  user?.photoURL
                    ? user.photoURL
                    : "https://i.ibb.co/CnXgXTB/no.webp"
                }
                alt=""
              />
              <p>{user.displayName}</p>
            </Link>
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
