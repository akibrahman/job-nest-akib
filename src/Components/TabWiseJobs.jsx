import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import loader from "/infinite.svg";

const TabWiseJobs = () => {
  const categories = ["On Site", "Remote", "Hybrid", "Part Time"];
  const [active, setActive] = useState("On Site");
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/all-jobs?category=${active}`)
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
                ? "bg-purple-500 text-white border border-transparent"
                : "bg-white text-purple-500 border border-purple-500"
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
              <button>View Details - </button>
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
