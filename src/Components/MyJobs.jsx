import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import loader from "/infinite.svg";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [myJobs, setMyJobs] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/all-jobs?email=${user.email}`)
      .then((res) => setMyJobs(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="w-[85%] mx-auto my-10">
      <p className="text-4xl text-center">My Created Jobs - {myJobs?.length}</p>
      <div className="my-10">
        {myJobs ? (
          <div className="my-10 grid grid-cols-3 gap-6">
            {myJobs.map((job) => (
              <div key={job._id} className="border-2 p-4 rounded-lg">
                {/* <p>Posted By: {job.authorName}</p> */}
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
