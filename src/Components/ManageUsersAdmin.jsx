import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { FaPen } from "react-icons/fa6";
import Modal from "react-modal";
import useAxios from "../Hooks/useAxios";
import loader from "/infinite.svg";

const ManageUsersAdmin = () => {
  const axiosInstance = useAxios();
  const [allUsers, setAllUsers] = useState(null);
  const [reloader, setReloader] = useState(true);
  const [typing, setTyping] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`/all-users-admin?search=${typing}`)
      .then((res) => setAllUsers(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [typing, axiosInstance, reloader]);
  const handleSearch = (event) => {
    setTyping(event.target.value);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState([]);
  const updatedRole = useRef();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setRole([]);
    setIsOpen(false);
  }
  return (
    <div className="mb-10 w-[95%]">
      <Helmet>
        <title>JobNest || Manage Users</title>
      </Helmet>
      <div className="bg-banner flex items-center justify-center">
        <div className="shadow-xl h-full w-full bg-[rgba(0,0,0,0.8)] py-4">
          <p className="text-center text-4xl font-semibold text-white">
            All Users - {allUsers?.length}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 border w-max mx-auto p-2 rounded-full border-theme">
            <p className="text-white">Search:</p>
            <input
              onChange={handleSearch}
              className="bg-purple-200 px-4 py-2 rounded-full w-80 focus:outline-none font-semibold"
              type="text"
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        // className="bg-theme"
      >
        {role.length == 0 ? (
          <p>Loading</p>
        ) : (
          <div className="p-10 bg-theme rounded-md font-semibold text-white">
            <p>Your Selected User is a General User</p>
            <p className="mt-6">Current Role: {role[0]}</p>
            <p className="-6">Select Role:</p>
            <select
              ref={updatedRole}
              defaultValue={role[0]}
              className="text-theme px-3 py-1 rounded-md mt-3"
            >
              <option value="admin">Admin</option>
              <option value="host">Host</option>
              <option value="general">General</option>
            </select>
            <br />
            <button
              onClick={async () => {
                const res = await axiosInstance.put(
                  `/update-role?email=${role[1]}&role=${updatedRole.current.value}`
                );
                if (res.data.acknowledged) {
                  setReloader(!reloader);
                  closeModal();
                }
              }}
              className="mt-4 bg-white text-theme px-3 py-1 rounded-md active:scale-90 duration-300"
            >
              Update
            </button>
          </div>
        )}
      </Modal>

      <div className="w-[95%] lg:w-full mx-auto">
        {allUsers ? (
          <div className="my-8 flex flex-col gap-6 md:gap-3">
            <div className="border-2 border-theme2 border-them2 p-1 md:p-4 rounded-lg flex flex-col gap-2 md:flex-row md:gap-0 items-center justify-between bg-theme2 font-semibold">
              <p className="w-14 text-center">Sl. No.</p>
              <p className="flex-1 text-center">Name</p>
              <p className="flex-1 text-center">E-mail</p>
              <p className="flex-1 text-center">Role</p>
              <p className="flex-1 text-center">Account Created</p>
              <p className="flex-1 text-center">Account Modified</p>
              {/* <p className="flex-1 text-center">Action</p> */}
            </div>
            {allUsers.map((user, i) => (
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
                key={user._id}
                className="border-2 p-1 md:p-4 rounded-lg flex items-center justify-between py-3 flex-col md:flex-row md:gap-0"
              >
                <p className="w-[5%] text-center">{i + 1}</p>
                <p className="w-[20%] text-center ">
                  {user.requested == "true" && (
                    <span className="text-xs text-theme font-black">
                      Wants to be Host
                    </span>
                  )}{" "}
                  <br />
                  {user.name}
                </p>
                <p className="w-[25%] text-center ">{user.email}</p>
                <p
                  className={`w-[9%] mx-3 text-center ${
                    user.role == "admin"
                      ? "bg-theme rounded-full text-white font-bold py-1"
                      : "flex items-center gap-2"
                  }  ${
                    user.role == "host"
                      ? "text-theme font-semibold border rounded-full pl-3 py-1 border-theme"
                      : ""
                  }`}
                >
                  {user.role.toUpperCase()}
                  {user.role == "admin" || (
                    <FaPen
                      onClick={async () => {
                        const data = await axiosInstance.get(
                          `get-role?email=${user.email}`
                        );
                        setRole([data.data, user.email]);
                        openModal();
                      }}
                      className="text-theme cursor-pointer"
                    />
                  )}
                </p>
                <p className="w-[20%] text-center">
                  {moment(user.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <p className="w-[20%] text-center">
                  {moment(user.timestampNow).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <img className="block mx-auto my-20" src={loader}></img>
        )}
      </div>
    </div>
  );
};

export default ManageUsersAdmin;
