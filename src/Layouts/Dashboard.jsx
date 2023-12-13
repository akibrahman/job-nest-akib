import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import {
  FaFonticonsFi,
  FaHouse,
  FaPersonMilitaryPointing,
  FaUserGroup,
} from "react-icons/fa6";
import { GiCampCookingPot } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { MdOutlineRateReview } from "react-icons/md";
// import { TbCoinTaka } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Components/AuthProvider";
import useAxios from "../Hooks/useAxios";
import useRole from "../Hooks/useRole";
// import useRole from "../Hooks/useRole";

const Dashboard = () => {
  const axiosInstance = useAxios();
  const [isReqed, setIsReqed] = useState(false);
  const [reloader, setReloader] = useState(false);
  const { role } = useRole();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axiosInstance
      .get(`/user?email=${user?.email}`)
      .then((data) => setIsReqed(data.data.requested));
  }, [user?.email, axiosInstance, user, reloader]);

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
                    <FaFonticonsFi />
                    My Applied Jobs
                  </NavLink>
                </li>
                {isReqed == "false" ? (
                  <li
                    onClick={async () => {
                      const data = await axiosInstance.put(
                        `/req-for-host?email=${user.email}`
                      );
                      if (data.data.acknowledged) {
                        setReloader(!reloader);
                        toast.success("Request Sent");
                      }
                    }}
                    className="text-theme bg-white rounded-md mt-20 font-medium"
                  >
                    <a>
                      <FaPersonMilitaryPointing />
                      Request to be Host
                    </a>
                  </li>
                ) : (
                  <li className="text-theme bg-white rounded-md mt-20 font-medium pointer-events-none">
                    <a>
                      <FaPersonMilitaryPointing />
                      Request Sent
                    </a>
                  </li>
                )}
              </>
            )}
            {/* User Panel  */}
            {role === "host" && (
              <>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/profile">
                    <CgProfile />
                    My Profile
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/add-a-job">
                    <GiCampCookingPot />
                    Add Job
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
                  <NavLink to="/dashboard/manage-users-admin">
                    <ImProfile />
                    Manage Users
                  </NavLink>
                </li>
                <li className="text-[#fff] font-medium">
                  <NavLink to="/dashboard/all-jobs-admin">
                    <FaUserGroup />
                    Manage Jobs
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
