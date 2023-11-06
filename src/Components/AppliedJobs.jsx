import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
// import { usePDF } from "react-to-pdf";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "./AuthProvider";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const targetRef = useRef();
  //   const { toPDF, targetRef } = usePDF({ filename: "AppliedJobs.pdf" });
  const categories = ["On Site", "Remote", "Hybrid", "Part Time"];
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    axiosInstance
      .get(`/applied-jobs?email=${user.email}`)
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
  //! PDF
  const options = {
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.LARGE,
      format: "A4",
      orientation: "portrait",
    },
  };
  return (
    <div ref={targetRef} className="w-[85%] mx-auto my-10">
      <Helmet>
        <title>JobNest || Applied Jobs</title>
      </Helmet>
      <p className="text-4xl text-center">My Applied Jobs</p>
      <div className="my-10 flex flex-col gap-6">
        <div className="flex items-center justify-center">
          <button
            onClick={() => generatePDF(targetRef, options)}
            className="bg-green-500 px-3 py-1 rounded-full text-white duration-300 active:scale-90"
          >
            Download PDF
          </button>
          <select
            onChange={handlefilter}
            className="text-center focus:outline-none"
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
        {/* ref={targetRef} */}
        <div>
          <div className="flex items-center justify-between p-4 bg-purple-200">
            <p className="flex-1 text-center">SL No.</p>
            <p className="flex-1 text-center">Company Logo</p>
            <p className="flex-1 text-center">Job Title</p>
            <p className="flex-1 text-center">Author Name</p>
            <p className="flex-1 text-center">Category</p>
            <p className="flex-1 text-center">Application Time</p>
          </div>
          {jobs ? (
            filteredJobs.map((job, i) => (
              <div
                key={job._id}
                className="flex items-center justify-between border-b-2 p-4"
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
              </div>
            ))
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
