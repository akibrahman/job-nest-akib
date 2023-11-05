import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const TabWiseJobs = () => {
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5500/all-jobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleTest = (date) => {
    console.log(moment().isBefore(moment(date)));
  };
  return (
    <div className="w-[85%] mx-auto my-10">
      <div className="flex items-center justify-center gap-10">
        <p className="bg-purple-500 font-semibold px-3 py-1 rounded-lg text-white">
          On Site
        </p>
        <p className="bg-purple-500 font-semibold px-3 py-1 rounded-lg text-white">
          Remote
        </p>
        <p className="bg-purple-500 font-semibold px-3 py-1 rounded-lg text-white">
          Hybrid
        </p>
        <p className="bg-purple-500 font-semibold px-3 py-1 rounded-lg text-white">
          Part Time
        </p>
      </div>
    </div>
  );
};

export default TabWiseJobs;
