import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loader from "/infinite.svg";

const JobDetailsPage = () => {
  const params = useParams();
  const [job, setJob] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/job-details/${params.id}`)
      .then((res) => {
        setJob(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [params.id]);
  return (
    <div>
      <p>Details</p>
      {job ? (
        <div className="border-2 p-4 rounded-lg">
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
        </div>
      ) : (
        <img className="block mx-auto my-20" src={loader}></img>
      )}
    </div>
  );
};

export default JobDetailsPage;
