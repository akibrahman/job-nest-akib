import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import logo from "/logo.png";

const NavBar = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const { user } = useContext(AuthContext);
  const [navbar, setNavbar] = useState(false);
  return (
    <div className=" border-b-2 border-theme relative">
      {/* For Mobile View  */}
      <motion.div
        animate={navbar ? "open" : "closed"}
        variants={variants}
        transition={{ type: "tween" }}
        onClick={() => setNavbar(false)}
        className={`fixed h-screen  bg-theme2 font-semibold top-0 px-10 py-10 md:hidden flex flex-col gap-4 z-50 
        ${navbar ? "left0" : "-translatex-full"}
        `}
      >
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
        <NavLink to="/all-jobs">
          <p>All Jobs</p>
        </NavLink>

        <NavLink to="/blogs">
          <p>Blogs</p>
        </NavLink>
      </motion.div>
      <nav className="w-[85%] md:w-[95%] lg:w-[85%] mx-auto flex items-center justify-between py-2 text-black font-semibold">
        <img
          className="w-24 md:w-28 lg:w-32 bg-white px-3 py-1 rounded-full"
          src={logo}
          alt=""
        />
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <NavLink to="/all-jobs">
            <p>All Jobs</p>
          </NavLink>
          {user && (
            <>
              {/* <NavLink to="/add-a-job">
                <p>Add a Job</p>
              </NavLink> */}
              {/* <NavLink to="/my-jobs">
                <p>My Jobs</p>
              </NavLink> */}
              {/* <NavLink to="/applied-jobs">
                <p>Applied Jobs</p>
              </NavLink> */}
            </>
          )}
          <NavLink to="/blogs">
            <p>Blogs</p>
          </NavLink>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                className="flex items-center gap-3 border px-1 py-1 pr-2 rounded-full"
                to="/dashboard/profile"
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
                <p className="hidden md:block">{user.displayName}</p>
              </Link>
              <div className="block md:hidden">
                <div
                  onClick={() => {
                    setNavbar(!navbar);
                  }}
                  className=""
                >
                  {navbar ? (
                    <LiaTimesSolid className="text-2xl duration-300 active:scale-75 cursor-pointer select-none"></LiaTimesSolid>
                  ) : (
                    <HiOutlineBars3BottomRight className="text-2xl duration-300 active:scale-75 cursor-pointer select-none"></HiOutlineBars3BottomRight>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="login">
                <p className="bg-theme px-3 py-1 rounded-full duration-300 select-none active:scale-90 text-white">
                  Login
                </p>
              </Link>
              <div className="block md:hidden">
                <div
                  onClick={() => {
                    setNavbar(!navbar);
                  }}
                  className=""
                >
                  {navbar ? (
                    <LiaTimesSolid className="text-2xl duration-300 active:scale-75 cursor-pointer select-none"></LiaTimesSolid>
                  ) : (
                    <HiOutlineBars3BottomRight className="text-2xl duration-300 active:scale-75 cursor-pointer select-none"></HiOutlineBars3BottomRight>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
