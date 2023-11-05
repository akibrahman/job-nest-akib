import axios from "axios";
import moment from "moment/moment";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "./AuthProvider";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);

  //! Handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = event.target;
    const jobdata = {
      authorName: user.displayName,
      authorEmail: user.email,
      jobTitle: data.jobTitle.value,
      jobCategory: data.category.value,
      jobPostingDate: data.jobPostingDate.value,
      applicationDeadline: selectedDate,
      applicants: 0,
      salaryRangeStart: parseInt(data.salaryRangeStart.value),
      salaryRangeEnd: parseInt(data.salaryRangeEnd.value),
    };
    axios
      .post(`${import.meta.env.VITE_serverUrl}/add-a-job`, jobdata)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //! Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="border-2 p-5 w-[70%] mx-auto my-16">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10"
      >
        <div className="flex items-center gap-4">
          <label htmlFor="">Job Post Creator:</label>
          <p>{user.displayName}</p>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Job Title</label>
          <input
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="text"
            name="jobTitle"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Job Category</label>
          <select name="category" id="">
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
            defaultValue={moment().format("Do MMM YYYY")}
            readOnly
            name="jobPostingDate"
          />
        </div>
        {/* Test  */}
        <div>
          <h2>Date Picker Example</h2>
          <DatePicker
            className="bg-purple-500"
            dateFormat="do MMM yyyy"
            selected={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Salary Range</label>
          <input
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="number"
            name="salaryRangeStart"
          />
          <input
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="number"
            name="salaryRangeEnd"
          />
        </div>
        <input
          type="submit"
          value="Add"
          className="bg-purple-500 px-3 py-1 rounded-lg font-semibold text-white active:scale-90 duration-300"
        />
      </form>
    </div>
  );
};

export default AddJob;
