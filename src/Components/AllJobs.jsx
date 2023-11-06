import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import loader from "/infinite.svg";

const AllJobs = () => {
  const [allJobs, setAllJobs] = useState(null);
  const [typing, setTyping] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5500/all-jobs?search=${typing}`)
      .then((res) => setAllJobs(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [typing]);
  const handleSearch = (event) => {
    setTyping(event.target.value);
  };
  return (
    <div className="w-[85%] mx-auto my-10">
      <Helmet>
        <title>JobNest || All Jobs</title>
      </Helmet>
      <p className="text-4xl text-center">All Jobs - {allJobs?.length}</p>
      <div className="flex items-center gap-4">
        <p>Search:</p>
        <input
          onChange={handleSearch}
          className="bg-purple-200 px-4 py-2 rounded-lg w-80 focus:outline-none font-semibold"
          type="text"
        />
      </div>
      <div className="my-10">
        {allJobs ? (
          <div className="my-10 grid grid-cols-3 gap-6">
            {allJobs.map((job) => (
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
                  <button className="bg-purple-500 text-white font-semibold px-4 py-1 rounded-lg mt-4 active:scale-90 duration-300 cursor-pointer select-none">
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
    </div>
  );
};

export default AllJobs;
