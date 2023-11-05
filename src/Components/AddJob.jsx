import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="border-2 p-5 w-[70%] mx-auto my-16">
      <form action="" className="flex flex-col items-center gap-10">
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
          <label htmlFor="">Job Posting Date</label>
          <input
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="text"
            name="jobPostingDate"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Application Deadline</label>
          <input
            className="bg-purple-500 text-white font-semibold px-3 py-2 rounded-lg"
            type="text"
            name="applicationDeadline"
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
      </form>
    </div>
  );
};

export default AddJob;
