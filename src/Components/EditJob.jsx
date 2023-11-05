import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
// import { AuthContext } from "./AuthProvider";

const EditJob = () => {
  const { id } = useParams();
  //   const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [newDeadline, setNewDeadline] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5500/job-details/${id}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleDateChange = (date) => {
    setNewDeadline(date);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedJob = {
      jobTitle: form.jobTitle.value,
      jobCategory: form.category.value,
      applicationDeadline: newDeadline ? newDeadline : job.applicationDeadline,
      salaryRangeStart: form.salaryRangeStart.value,
      salaryRangeEnd: form.salaryRangeEnd.value,
    };
    axios
      .patch(`http://localhost:5500/update-a-job/${id}`, updatedJob)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          console.log("Updated One");
        }
      })
      .catch((error) => {
        console.log("This is the upgration error", error);
      });
    axios
      .patch(`http://localhost:5500/update-jobs/${id}`, updatedJob)
      .then((res) => {
        console.log("More", res.data.modifiedCount, "Applied Jobs Are Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!job) return <p>Loading</p>;
  return (
    <div className="border-2 p-5 w-[70%] mx-auto my-16">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10"
      >
        <div className="flex items-center gap-4">
          <label htmlFor="">Job Post Creator: {job.authorName}</label>
          <p>{}</p>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Job Title</label>
          <input
            defaultValue={job.jobTitle}
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="text"
            name="jobTitle"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Job Category</label>
          <select defaultValue={job.jobCategory} name="category" id="">
            <option value="onsite">On Site Job</option>
            <option value="remote">Remote Job</option>
            <option value="hybrid">Hybrid Job</option>
            <option value="parttime">Part Time Job</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Job Posting Date</label>
          <input
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="text"
            defaultValue={job.jobPostingDate}
            readOnly
            name="jobPostingDate"
          />
        </div>
        {/* Test  */}
        <div>
          <label>Deadline</label>
          <DatePicker
            className="bg-purple-500 cursor-pointer"
            dateFormat="do MMM yyyy"
            selected={
              newDeadline ? newDeadline : new Date(job.applicationDeadline)
            }
            onChange={handleDateChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Salary Range</label>
          <input
            defaultValue={job.salaryRangeStart}
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="number"
            name="salaryRangeStart"
          />
          <input
            defaultValue={job.salaryRangeEnd}
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="number"
            name="salaryRangeEnd"
          />
        </div>
        <input
          type="submit"
          value="Update"
          className="bg-purple-500 px-3 py-1 rounded-lg font-semibold text-white active:scale-90 duration-300"
        />
      </form>
    </div>
  );
};

export default EditJob;
