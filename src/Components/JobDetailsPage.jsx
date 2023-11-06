import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import loader from "/infinite.svg";

const JobDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [job, setJob] = useState(null);
  const [reloader, setReloader] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/job-details/${params.id}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((error) => console.log(error));
  }, [params.id, reloader]);
  const apply = () => {
    if (user.email === job.authorEmail) {
      alert("You are the Owner of this Post");
      return;
    } else if (!moment().isBefore(job.applicationDeadline)) {
      alert("Deadline Over");
      return;
    }
    axios
      .post("http://localhost:5500/get-a-applied-job", {
        email: user.email,
        id: job._id,
      })
      .then((res) => {
        if (typeof res.data == "object") {
          alert("Can not be Applied");
          return;
        }
        if (typeof res.data == "string") {
          axios
            .patch(`http://localhost:5500/applicants-count/${job._id}`, {
              previousCount: parseInt(job.applicants),
            })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                const {
                  _id,
                  authorName,
                  authorEmail,
                  jobTitle,
                  companyImgURL,
                  bannerImgURL,
                  jobCategory,
                  jobPostingDate,
                  applicationDeadline,
                  salaryRangeStart,
                  salaryRangeEnd,
                } = job;
                const data = {
                  jobID: _id,
                  applicantName: user.displayName,
                  applicantEmail: user.email,
                  applicationDate: moment(),
                  companyImgURL,
                  bannerImgURL,
                  authorName,
                  authorEmail,
                  jobTitle,
                  jobCategory,
                  jobPostingDate,
                  applicationDeadline,
                  salaryRangeStart,
                  salaryRangeEnd,
                };
                axios
                  .post("http://localhost:5500/add-a-applied-job", data)
                  .then((res) => {
                    console.log(res.data);
                    setReloader(!reloader);
                    alert("Done");
                  })
                  .catch((error) => console.log(error));
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => console.log(error));
  };
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

          <button
            onClick={apply}
            className="bg-purple-500 font-semibold text-white px-4
           py-2 rounded-md active:scale-90 duration-300 select-none cursor-pointer"
          >
            Apply
          </button>
        </div>
      ) : (
        <img className="block mx-auto my-20" src={loader}></img>
      )}
    </div>
  );
};

export default JobDetailsPage;