import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [newDeadline, setNewDeadline] = useState(null);
  const [companyImg, setCompanyImg] = useState(null);
  const [companyImgPreview, setCompanyImgPreview] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [bannerImgPreview, setBannerImgPreview] = useState(null);

  //   const [companyImgUrl, setCompanyImgUrl] = useState(null);
  //   const [bannerImgUrl, setBannerImgUrl] = useState(null);
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

  const checker = async (data) => {
    return new Promise((resolve) => {
      if (data) {
        const imgData = new FormData();
        imgData.append("image", data);

        axios
          .post(
            "https://api.imgbb.com/1/upload?key=f8c09563e2c3334b8e3c08a6de7d30df",
            imgData
          )
          .then((res) => {
            resolve(res.data.data.display_url);
          });
      } else resolve(false);
    });
  };

  //! Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const isNewCompanyImg = await checker(companyImg);
    const isNewBannerImg = await checker(bannerImg);
    const newData = {
      companyImage: isNewCompanyImg ? isNewCompanyImg : job.companyImgURL,
      bannerImage: isNewBannerImg ? isNewBannerImg : job.bannerImgURL,
    };
    const updatedJob = {
      jobTitle: form.jobTitle.value,
      companyImgURL: newData.companyImage,
      bannerImgURL: newData.bannerImage,
      jobCategory: form.category.value,
      applicationDeadline: newDeadline ? newDeadline : job.applicationDeadline,
      salaryRangeStart: form.salaryRangeStart.value,
      salaryRangeEnd: form.salaryRangeEnd.value,
    };

    axios
      .patch(`http://localhost:5500/update-a-job/${id}`, updatedJob)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Job Updated", {
            position: "top-center",
            autoClose: 2000,
          });
          axios
            .put(`http://localhost:5500/update-jobs/${id}`, updatedJob)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                toast.info(
                  `More ${res.data.modifiedCount} Applied Jobs Are Updated`,
                  {
                    position: "top-center",
                    autoClose: 2000,
                  }
                );
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log("This is single upgration error", error);
      });
  };
  //! BASE64 Convertor
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //! Image Input
  const handleCompanyImgInput = async (event) => {
    setCompanyImg(event.target.files[0]);
    const base64 = await convertBase64(event.target.files[0]);
    setCompanyImgPreview(base64);
  };
  const handleBannerImgInput = async (event) => {
    setBannerImg(event.target.files[0]);
    const base64 = await convertBase64(event.target.files[0]);
    setBannerImgPreview(base64);
  };

  if (!job) return <p>Loading</p>;
  return (
    <div className="border-2 p-5 w-[70%] mx-auto my-16">
      <Helmet>
        <title>JobNest||Edit Job</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10"
      >
        <div className="flex items-center gap-4">
          <label htmlFor="">Job Post Creator: </label>
          <p>{job.authorName}</p>
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
          <label htmlFor="">Company Logo</label>
          <input onChange={handleCompanyImgInput} type="file" />
          <img
            className={`${
              companyImgPreview || job.companyImgURL
                ? "w-12 h-12 rounded-full border-2"
                : ""
            }`}
            src={companyImgPreview ? companyImgPreview : job.companyImgURL}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Banner</label>
          <input onChange={handleBannerImgInput} type="file" />
          <img
            className={`${
              bannerImgPreview || job.bannerImgURL
                ? "w-28 h-14 rounded-md border-2"
                : ""
            }`}
            src={bannerImgPreview ? bannerImgPreview : job.bannerImgURL}
            alt=""
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
