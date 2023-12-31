import { motion } from "framer-motion";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { usePDF } from "react-to-pdf";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "./AuthProvider";
import loader from "/infinite.svg";

const AppliedJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  // const targetRef = useRef();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
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
  // const options = {
  //   method: "open",
  //   resolution: Resolution.HIGH,
  //   page: {
  //     margin: Margin.MEDIUM,
  //     format: "A4",
  //     orientation: "portrait",
  //   },
  // };
  return (
    <div className="mb-52 w-[90%]">
      <Helmet>
        <title>JobNest || Applied Jobs</title>
      </Helmet>

      <div className="bg-banner flex items-center justify-center">
        <div className="shadow-xl h-full w-full bg-[rgba(0,0,0,0.8)] py-6">
          <p className="text-center text-4xl font-semibold text-white">
            My Applied Jobs - {jobs?.length}
          </p>
          <div className="flex items-center justify-center gap-5 mt-6">
            <button
              onClick={() => toPDF()}
              className="bg-green-500 px-3 py-1 rounded-full text-white duration-300 active:scale-90"
            >
              Download PDF
            </button>
            <select
              onChange={handlefilter}
              className="text-center focus:outline-none rounded-full p-1"
            >
              <option className="text-xs" value="all">
                All Jobs
              </option>
              {categories.map((category, i) => (
                <option
                  className="text-xs"
                  key={i + 1}
                  value={category.split(" ").join("").toLowerCase()}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div ref={targetRef} className="my-6 w-full mx-auto">
        {/* ref={targetRef} */}
        <div className="flex flex-col gap-5 lg:gap-0">
          <div className="border-2 border-theme2 border-them2 p-4 rounded-lg flex flex-col gap-1 md:flex-row md:gap-0 items-center justify-between bg-theme2 font-semibold">
            <p className="w-12 text-center">SL No.</p>
            <p className="flex-1 text-center">Company Logo</p>
            <p className="flex-1 text-center">Job Title</p>
            <p className="flex-1 text-center">Author Name</p>
            <p className="flex-1 text-center">Category</p>
            <p className="flex-1 text-center">Application Time</p>
          </div>
          {jobs ? (
            filteredJobs.map((job, i) => (
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
                key={job._id}
                className="flex flex-col gap-2 md:flex-row md:gap-0 items-center justify-between border-b-2 p-4"
              >
                <p className="w-12 text-center">{i + 1}</p>
                <div className="flex-1 flex items-center justify-center">
                  <img className="w-10 h-10" src={job.companyImgURL} alt="" />
                </div>
                <p className="flex-1 text-center">{job.jobTitle}</p>
                <p className="flex-1 text-center">{job.authorName}</p>
                <p className="flex-1 text-center">
                  {job.jobCategory.charAt(0).toUpperCase() +
                    job.jobCategory.slice(1)}
                </p>
                <p className="flex-1 text-center">
                  {moment(job.applicationDate).format("Do MMM YYYY")}
                </p>
              </motion.div>
            ))
          ) : (
            <img className="block mx-auto my-20" src={loader}></img>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
