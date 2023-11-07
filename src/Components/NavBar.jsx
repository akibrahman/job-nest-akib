import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import logo from "/logo.png";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className=" border-b-2 border-theme">
      <nav className="w-[85%] mx-auto flex items-center justify-between py-2 text-black font-semibold">
        <img
          className="w-32 bg-white px-3 py-1 rounded-full"
          src={logo}
          alt=""
        />
        <div className="flex items-center gap-4">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/all-jobs">
            <p>All Jobs</p>
          </Link>
          {user && (
            <>
              <Link to="/add-a-job">
                <p>Add a Job</p>
              </Link>
              <Link to="/my-jobs">
                <p>My Jobs</p>
              </Link>
              <Link to="/applied-jobs">
                <p>Applied Jobs</p>
              </Link>
            </>
          )}
        </div>
        <div>
          {user ? (
            <Link
              className="flex items-center gap-3 border px-1 py-1 pr-2 rounded-full"
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
