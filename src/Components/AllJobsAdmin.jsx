import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BsArrowRight } from "react-icons/bs";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import loader from "/infinite.svg";

const AllJobsAdmin = () => {
  const axiosInstance = useAxios();
  const [allJobs, setAllJobs] = useState(null);
  const [typing, setTyping] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`/all-jobs?search=${typing}`)
      .then((res) => setAllJobs(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [typing, axiosInstance]);
  const handleSearch = (event) => {
    setTyping(event.target.value);
    // setAllJobs([]);
  };
  return (
    <div className="mb-10">
      <Helmet>
        <title>JobNest || All Jobs</title>
      </Helmet>
      <div className="bg-banner flex items-center justify-center">
        <div className="shadow-xl h-full w-full bg-[rgba(0,0,0,0.8)] py-4">
          <p className="text-center text-4xl font-semibold text-white">
            All Jobs - {allJobs?.length}
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

      <div className="w-[95%] lg:w-full mx-auto">
        {allJobs ? (
          <div className="my-8 flex flex-col gap-6 md:gap-3">
            <div className="border-2 border-theme2 border-them2 p-1 md:p-4 rounded-lg flex flex-col gap-2 md:flex-row md:gap-0 items-center justify-between bg-theme2 font-semibold">
              <p className="w-14 text-center">Sl. No.</p>
              <p className="flex-1 text-center">Author Name</p>
              <p className="flex-1 text-center">Job Title</p>
              <p className="flex-1 text-center">Posting Date</p>
              <p className="flex-1 text-center">Deadline</p>
              <p className="flex-1 text-center">Salary Range</p>
              <p className="flex-1 text-center">Details</p>
            </div>
            {allJobs.map((job, i) => (
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
                key={job._id}
                className="border-2 p-1 md:p-4 rounded-lg flex items-center justify-between py-3 flex-col gap-3 md:flex-row md:gap-0"
              >
                <p className="w-14 text-center">{i + 1}</p>
                <p className="flex-1 text-center">{job.authorName}</p>
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
                <Link
                  className="flex-1 text-center"
                  to={`/job-details/${job._id}`}
                >
                  <button className="bg-theme text-white font-semibold px-4 py-1 rounded-lg active:scale-90 duration-300 cursor-pointer select-none flex items-center justify-center gap-2 mx-auto">
                    View <BsArrowRight></BsArrowRight>
                  </button>
                </Link>
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

export default AllJobsAdmin;
