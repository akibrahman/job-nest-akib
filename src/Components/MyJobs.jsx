import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
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
    //Delete from allJobs
    axios
      .delete(`http://localhost:5500/delete-my-job/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          const remaining = myJobs.filter((job) => job._id !== id);
          setMyJobs(remaining);
          alert("Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // Delete from appliedJobs
    axios
      .delete(`http://localhost:5500/delete-my-job-from-applied-job/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-[85%] mx-auto my-10">
      <Helmet>
        <title>JobNest || My Jobs</title>
      </Helmet>
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
                  Application Deadline:
                  {moment(job.applicationDeadline).format("Do MMM YYYY")}
                </p>
                <p>
                  Salary Range: <span>{job.salaryRangeStart}</span>-
                  <span>{job.salaryRangeEnd}</span>
                </p>
                <p>Applicants Number: {job.applicants}</p>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 w-9 h-9 rounded-full"
                >
                  X
                </button>
                <Link to={`/job-edit/${job._id}`}>
                  <button className="bg-yellow-500 w-9 h-9 rounded-full">
                    E
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

export default MyJobs;
