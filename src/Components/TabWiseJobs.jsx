import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "./AuthProvider";
import loader from "/infinite.svg";

const TabWiseJobs = () => {
  const categories = ["On Site", "Remote", "Hybrid", "Part Time"];
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState("On Site");
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    axiosInstance
      .get(`/all-jobs?category=${active}`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [active]);
  const handleTabChange = (category) => {
    setJobs(null);
    setActive(category);
  };
  return (
    <div className="w-[85%] mx-auto my-10">
      <div className="flex items-center justify-center gap-10">
        {categories.map((category, index) => (
          <p
            onClick={() => handleTabChange(category)}
            key={index}
            className={`font-semibold px-3 py-1 rounded-lg cursor-pointer select-none active:scale-90 duration-300 ${
              category == active
                ? "bg-theme2 text-white border border-transparent"
                : "bg-white text-theme2 border border-theme"
            }`}
          >
            {category}
          </p>
        ))}
      </div>
      {jobs ? (
        <div className="w-[85%] mx-auto my-10 grid grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="border-2 p-4 rounded-lg">
              <p>Posted By: {job.authorName}</p>
              <p>Job Title: {job.jobTitle}</p>
              <p>Job Posting Date: {job.jobPostingDate}</p>
              <p>
                Application Deadline:{" "}
                {moment(job.applicationDeadline).format("Do MMM YYYY")}
              </p>
              <p>
                Salary Range: <span>{job.salaryRangeStart}</span>-
                <span>{job.salaryRangeEnd}</span>
              </p>
              <p>Applicants Number: {job.applicants}</p>
              <Link to={`/job-details/${job._id}`}>
                <button
                  onClick={() => {
                    !user &&
                      toast.info("You have to log in first to View Details", {
                        position: "top-center",
                        autoClose: 2000,
                      });
                  }}
                  className="bg-purple-500 text-white font-semibold px-4 py-1 rounded-lg mt-4 active:scale-90 duration-300 cursor-pointer select-none"
                >
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <img className="block mx-auto my-20" src={loader}></img>
      )}
    </div>
  );
};

export default TabWiseJobs;
