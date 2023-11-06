import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const categories = ["On Site", "Remote", "Hybrid", "Part Time"];
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/applied-jobs?email=${user.email}`)
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.email]);

  const handlefilter = (event) => {
    if (event.target.value === "all") {
      setFilteredJobs([...jobs]);
      return;
    }
    const existingJobs = [...jobs];
    const filteredJobs = existingJobs.filter(
      (job) => job.jobCategory === event.target.value
    );
    setFilteredJobs(filteredJobs);
  };
  return (
    <div className="w-[85%] mx-auto my-10">
      <p className="text-4xl text-center">My Applied Jobs</p>
      <div className="my-10 flex flex-col gap-6">
        <div className="flex items-center justify-between border-y-2 p-4 bg-purple-200">
          <p className="flex-1 text-center">SL No.</p>
          <p className="flex-1 text-center">Company Logo</p>

          <p className="flex-1 text-center">Job Title</p>
          <p className="flex-1 text-center">Author Name</p>
          <p className="flex-1 text-center">Category</p>
          <p className="flex-1 text-center">Application Time</p>
          <select
            onChange={handlefilter}
            className="flex-1 text-center focus:outline-none"
          >
            <option value="all">All Jobs</option>
            {categories.map((category, i) => (
              <option
                key={i + 1}
                value={category.split(" ").join("").toLowerCase()}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
        {jobs ? (
          filteredJobs.map((job, i) => (
            <div
              key={job._id}
              className="flex items-center justify-between border-y-2 p-4"
            >
              <p className="flex-1 text-center">{i + 1}</p>
              <div className="flex-1 flex items-center justify-center">
                <img className="w-10 h-10" src={job.companyImgURL} alt="" />
              </div>
              <p className="flex-1 text-center">{job.jobTitle}</p>
              <p className="flex-1 text-center">{job.authorName}</p>
              <p className="flex-1 text-center">{job.jobCategory}</p>
              <p className="flex-1 text-center">
                {moment(job.applicationDate).format("Do MMM YYYY")}
              </p>
              <p className="flex-1 text-center">Details</p>
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
