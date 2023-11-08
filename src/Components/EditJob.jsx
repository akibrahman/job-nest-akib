import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../Hooks/useAxios";
import loader from "/infinite.svg";

const EditJob = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [job, setJob] = useState(null);
  const [newDeadline, setNewDeadline] = useState(null);
  const [companyImg, setCompanyImg] = useState(null);
  const [companyImgPreview, setCompanyImgPreview] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [bannerImgPreview, setBannerImgPreview] = useState(null);
  useEffect(() => {
    axiosInstance
      .get(`/job-details/${id}`)
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
      jobDescription: form.jobDescription.value,
      applicationDeadline: newDeadline ? newDeadline : job.applicationDeadline,
      salaryRangeStart: form.salaryRangeStart.value,
      salaryRangeEnd: form.salaryRangeEnd.value,
    };

    axiosInstance
      .patch(`/update-a-job/${id}`, updatedJob)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Job Updated", {
            position: "top-center",
            autoClose: 2000,
          });
          axiosInstance
            .put(`/update-jobs/${id}`, updatedJob)
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

  if (!job) return <img className="block mx-auto my-20" src={loader}></img>;
  return (
    <div className="">
      <Helmet>
        <title>JobNest || Edit Job</title>
      </Helmet>
      <div className="bg-banner flex items-center justify-center">
        <div className="h-full w-full bg-[rgba(0,0,0,0.8)] py-10">
          <p className="text-center text-4xl font-bold text-white">
            Edit Job Post
          </p>
        </div>
      </div>
      <div className="w-[95%] lg:w-[85%] mx-auto my-10">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-5 md:gap-10 p-5 px-10 border border-theme rounded-lg"
        >
          <div className="flex items-center gap-4 font-semibold border-2 border-theme rounded-full px-3 py-2">
            <label htmlFor="">Job Post Creator:</label>
            <p className="text-theme text-xl">{job.authorName}</p>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:gap-0 justify-between items-center w-full my-5">
            <div className="flex items-center gap-4">
              <label className="font-semibold">Job Title</label>
              <input
                defaultValue={job.jobTitle}
                required
                placeholder="Enter Job Title"
                className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                type="text"
                name="jobTitle"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-5">
              <label className="font-semibold mb-5 md:mb-0">Salary Range</label>
              <input
                required
                defaultValue={job.salaryRangeStart}
                placeholder="Starts"
                className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full w-40 placeholder:text-center"
                type="number"
                name="salaryRangeStart"
              />
              <p>-</p>
              <input
                required
                defaultValue={job.salaryRangeEnd}
                placeholder="Ends"
                className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full w-40 placeholder:text-center"
                type="number"
                name="salaryRangeEnd"
              />
            </div>
          </div>

          <div className="flex flex-col xl:flex-row justify-between items-center w-full my-5 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-[130px] font-semibold">Company Logo</label>
                <input
                  className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                  onChange={handleCompanyImgInput}
                  type="file"
                />
                <img
                  className={`${
                    companyImgPreview || job.companyImgURL
                      ? "w-12 h-12 rounded-full border-2"
                      : ""
                  }`}
                  src={
                    companyImgPreview ? companyImgPreview : job.companyImgURL
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-[130px] font-semibold text-center md:text-left">
                  Banner
                </label>
                <input
                  className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                  onChange={handleBannerImgInput}
                  type="file"
                />
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
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label className="w-[110px] font-semibold">Posting Date</label>
                <input
                  className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                  type="text"
                  defaultValue={job.jobPostingDate}
                  readOnly
                  name="jobPostingDate"
                />
              </div>
              {/* Test  */}
              <div className="flex items-center gap-4">
                <label className="w-[110px] font-semibold">Deadline</label>
                <DatePicker
                  required
                  placeholderText="Enter Deadline"
                  className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                  dateFormat="do MMM yyyy"
                  selected={
                    newDeadline
                      ? newDeadline
                      : new Date(job.applicationDeadline)
                  }
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="font-semibold">Job Category</label>
            <select
              className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
              name="category"
              defaultValue={job.jobCategory}
            >
              <option value="onsite">On Site Job</option>
              <option value="remote">Remote Job</option>
              <option value="hybrid">Hybrid Job</option>
              <option value="parttime">Part Time Job</option>
            </select>
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <label className="font-semibold">Description</label>
            <textarea
              required
              defaultValue={job.jobDescription}
              name="jobDescription"
              className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-lg w-full"
              placeholder="Enter the Description for your Job"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <input
            type="submit"
            value="Update"
            className="bg-theme px-4 py-2 rounded-full font-semibold text-white active:scale-90 duration-300 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default EditJob;
