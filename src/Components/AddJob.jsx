import axios from "axios";
import moment from "moment/moment";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { AuthContext } from "./AuthProvider";

const AddJob = () => {
  const { user } = useContext(AuthContext);
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
                alert("Added");
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
    <div className="border-2 p-5 w-[70%] mx-auto my-16">
      <Helmet>
        <title>JobNest || Add Job</title>
      </Helmet>
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
          <label htmlFor="">Company Logo</label>
          <input onChange={handleCompanyImgInput} type="file" />
          <img
            className={`${
              companyImgPreview ? "w-12 h-12 rounded-full border-2" : ""
            }`}
            src={companyImgPreview}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="">Banner</label>
          <input onChange={handleBannerImgInput} type="file" />
          <img
            className={`${
              bannerImgPreview ? "w-28 h-14 rounded-md border-2" : ""
            }`}
            src={bannerImgPreview}
            alt=""
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
