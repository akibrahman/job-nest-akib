import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "./AuthProvider";
import loader from "/infinite.svg";

const MyJobs = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [myJobs, setMyJobs] = useState(null);
  useEffect(() => {
    axiosInstance
      .get(`/my-jobs?email=${user.email}`)
      .then((res) => setMyJobs(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [user.email]);

  //! Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "This job will be deleted permanently!",
      icon: "question",
      showCancelButton: true,
      //   background: `${!isDark ? "#111" : "#fff"}`,
      //   color: `${!isDark ? "#fff" : "#111"}`,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //Delete from allJobs
        axiosInstance
          .delete(`/delete-my-job/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const remaining = myJobs.filter((job) => job._id !== id);
              setMyJobs(remaining);
              Swal.fire({
                title: "Deleted",
                text: "Your post is deleted successfully",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // Delete from appliedJobs
        axiosInstance
          .delete(`/delete-my-job-from-applied-job/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              toast.info("Also Deleted from Applied Job", {
                position: "top-center",
                autoClose: 4000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Swal.fire({
          title: "Cancelled",
          icon: "info",
        });
      }
    });
  };
  return (
    <div className="my-10">
      <Helmet>
        <title>JobNest || My Jobs</title>
      </Helmet>
      <div className="bg-banner flex items-center justify-center">
        <div className="shadow-xl h-full w-full bg-[rgba(0,0,0,0.8)] py-6">
          <p className="text-center text-4xl font-semibold text-white">
            My Created Jobs - {myJobs?.length}
          </p>
        </div>
      </div>

      <div className="w-[85%] mx-auto ">
        {myJobs ? (
          <div className="my-8 flex flex-col gap-3">
            <div className="border-2 border-them2 p-4 rounded-lg flex items-center justify-between bg-theme2 font-semibold">
              <p className="w-14 text-center">Sl. No.</p>
              <p className="flex-1 text-center">Job Title</p>
              <p className="flex-1 text-center">Posting Date</p>
              <p className="flex-1 text-center">Deadline</p>
              <p className="flex-1 text-center">Salary Range</p>
              <p className="flex-1 text-center">Applicants</p>
              <p className="flex-1 text-center">Action</p>
            </div>
            {myJobs.map((job, i) => (
              <div
                key={job._id}
                className="border-2 p-4 rounded-lg flex items-center justify-between"
              >
                <p className="w-14 text-center">{i + 1}</p>
                <p className="flex-1 text-center">{job.jobTitle}</p>
                <p className="flex-1 text-center">{job.jobPostingDate}</p>
                <p className="flex-1 text-center">
                  {moment(job.applicationDeadline).format("Do MMM YYYY")}
                </p>
                <p className="flex-1 text-center flex items-center gap-1">
                  <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
                  <span>{job.salaryRangeStart}</span>-
                  <span>{job.salaryRangeEnd}</span>
                </p>
                <p className="flex-1 text-center">{job.applicants}</p>
                <div className="flex-1 flex justify-center items-center gap-2">
                  <Link className="flex" to={`/job-edit/${job._id}`}>
                    <button className="bg-orange-500 text-white font-semibold  active:scale-90 duration-300 rounded-full">
                      <FiEdit3 className="w-9 h-9 p-2"></FiEdit3>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-600 text-white font-semibold  active:scale-90 duration-300 rounded-full"
                  >
                    <MdDeleteOutline className="w-9 h-9 p-2"></MdDeleteOutline>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <img className="block mx-auto my-20" src={loader}></img>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
