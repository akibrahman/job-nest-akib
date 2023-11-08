import axios from "axios";
import moment from "moment/moment";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "./AuthProvider";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [selectedDate, setSelectedDate] = useState(null);

  const [companyImg, setCompanyImg] = useState(null);
  const [companyImgPreview, setCompanyImgPreview] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [bannerImgPreview, setBannerImgPreview] = useState(null);

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

  //! Handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = event.target;
    const companyImgData = new FormData();
    companyImgData.append("image", companyImg);
    const bannerImgData = new FormData();
    bannerImgData.append("image", bannerImg);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=f8c09563e2c3334b8e3c08a6de7d30df",
        companyImgData
      )
      .then((res) => {
        console.log(res.data.data.display_url);
        let companyImgUrl = res.data.data.display_url;
        axios
          .post(
            "https://api.imgbb.com/1/upload?key=f8c09563e2c3334b8e3c08a6de7d30df",
            bannerImgData
          )
          .then((res) => {
            console.log(res.data.data.display_url);
            let bannerImgUrl = res.data.data.display_url;
            const jobdata = {
              authorName: user.displayName,
              authorEmail: user.email,
              jobTitle: data.jobTitle.value,
              companyImgURL: companyImgUrl,
              bannerImgURL: bannerImgUrl,
              jobCategory: data.category.value,
              jobDescription: data.jobDescription.value,
              jobPostingDate: data.jobPostingDate.value,
              applicationDeadline: selectedDate,
              applicants: 0,
              salaryRangeStart: parseInt(data.salaryRangeStart.value),
              salaryRangeEnd: parseInt(data.salaryRangeEnd.value),
            };
            axiosInstance
              .post(`/add-a-job`, jobdata)
              .then((res) => {
                console.log(res.data);
                toast.success("Job Added Successfully", {
                  position: "top-center",
                  autoClose: 2000,
                });
                data.reset();
                setBannerImgPreview(null);
                setCompanyImgPreview(null);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log("Banner Photo Error - ", error);
          });
      })
      .catch((error) => {
        console.log("Company Photo Error - ", error);
      });
  };
  //! Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
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
  return (
    <div className="">
      <Helmet>
        <title>JobNest || Add Job</title>
      </Helmet>
      <div className="bg-banner flex items-center justify-center">
        <div className="h-full w-full bg-[rgba(0,0,0,0.8)] py-10">
          <p className="text-center text-4xl font-bold text-white">
            Add Your Job
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
            <p className="text-theme text-lg md:text-xl">{user.displayName}</p>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:gap-0 justify-between items-center w-full my-5">
            <div className="flex items-center gap-4">
              <label className="font-semibold w-[80px]">Job Title</label>
              <input
                required
                placeholder="Enter Job Title"
                className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full w-[250px]"
                type="text"
                name="jobTitle"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-5">
              <label className="font-semibold mb-5 md:mb-0">Salary Range</label>
              <input
                required
                placeholder="Starts"
                className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full w-40 placeholder:text-center"
                type="number"
                name="salaryRangeStart"
              />
              <p>-</p>
              <input
                required
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
                  required
                  className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                  onChange={handleCompanyImgInput}
                  type="file"
                />
                <img
                  className={`${
                    companyImgPreview ? "w-12 h-12 rounded-full border-2" : ""
                  }`}
                  src={companyImgPreview}
                  alt=""
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-[130px] font-semibold text-center md:text-left">
                  Banner
                </label>
                <input
                  className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                  required
                  onChange={handleBannerImgInput}
                  type="file"
                />
                <img
                  className={`${
                    bannerImgPreview ? "w-14 h-14 rounded-md border-2" : ""
                  }`}
                  src={bannerImgPreview}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-[110px] font-semibold">Posting Date</label>
                <input
                  className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                  type="text"
                  defaultValue={moment().format("Do MMM YYYY")}
                  readOnly
                  name="jobPostingDate"
                />
              </div>
              {/* Test  */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <label className="w-[110px] font-semibold">Deadline</label>
                <DatePicker
                  required
                  placeholderText="Enter Deadline"
                  className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full"
                  dateFormat="do MMM yyyy"
                  selected={selectedDate}
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
              id=""
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
              name="jobDescription"
              className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-lg w-full"
              placeholder="Enter the Description for your Job"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <input
            type="submit"
            value="Add"
            className="bg-theme px-4 py-2 rounded-full font-semibold text-white active:scale-90 duration-300 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default AddJob;
