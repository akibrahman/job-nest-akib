import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { FaHouse, FaUserGroup } from "react-icons/fa6";
import { GiCampCookingPot, GiMeal } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { MdOutlineRateReview } from "react-icons/md";
// import { TbCoinTaka } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";
// import useRole from "../Hooks/useRole";

const Dashboard = () => {
  const { role } = useRole();

  return (
    <div className={`drawer lg:drawer-open`}>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div className="w-full">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary mt-2 ml-2 bg-primary drawer-button lg:hidden"
          >
            <FaBars />
          </label>
        </div>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 bg-gradient-to-r from-theme to-theme2 text-white min-h-full font-cinzel">
          <p className="text-2xl font-black text-center">Meal Master</p>
          <p className="font-bold text-center">Hostel Management system</p>
          <div className="mt-10">
            {/* User Panel  */}
            {role === "general" && (
              <>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/profile">
                    <CgProfile />
                    My Profile
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/applied-jobs">
                    <GiMeal />
                    My Applied Jobs
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/my-jobs">
                    <MdOutlineRateReview />
                    My Posted Jobs
                  </NavLink>
                </li>
              </>
            )}
            {/* Admin Panel  */}
            {role === "admin" && (
              <>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/profile">
                    <ImProfile />
                    Admin Profile
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/all-jobs-admin">
                    <FaUserGroup />
                    All Jobs
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/add-a-job">
                    <GiCampCookingPot />
                    Add Job
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider divider-warning">Main</div>
            <li className="text-[#fff] font-medium">
              <NavLink to="/">
                <FaHouse></FaHouse>Home
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
