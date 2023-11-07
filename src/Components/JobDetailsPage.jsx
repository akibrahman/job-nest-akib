import emailjs from "@emailjs/browser";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FiShield } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "./AuthProvider";
import banner from "/banner.jpg";
// import loader from "/infinite.svg";

const JobDetailsPage = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [job, setJob] = useState([]);
  const [reloader, setReloader] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/job-details/${params.id}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((error) => console.log(error));
  }, [params.id, reloader, axiosInstance]);
  const apply = () => {
    if (user.email === job.authorEmail) {
      toast.info("You are the Owner of this Job", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    } else if (!moment().isBefore(job.applicationDeadline)) {
      toast.error("Deadline for this job is Over !", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    axiosInstance
      .post("/get-a-applied-job", {
        email: user.email,
        id: job._id,
      })
      .then((res) => {
        if (typeof res.data == "object") {
          toast.info("Already Applied", {
            position: "top-center",
            autoClose: 2000,
          });
          return;
        }
        if (typeof res.data == "string") {
          axiosInstance
            .patch(`/applicants-count/${job._id}`, {
              previousCount: parseInt(job.applicants),
            })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                const {
                  _id,
                  authorName,
                  authorEmail,
                  jobTitle,
                  companyImgURL,
                  bannerImgURL,
                  jobCategory,
                  jobPostingDate,
                  applicationDeadline,
                  salaryRangeStart,
                  salaryRangeEnd,
                } = job;
                const data = {
                  jobID: _id,
                  applicantName: user.displayName,
                  applicantEmail: user.email,
                  applicationDate: moment(),
                  companyImgURL,
                  bannerImgURL,
                  authorName,
                  authorEmail,
                  jobTitle,
                  jobCategory,
                  jobPostingDate,
                  applicationDeadline,
                  salaryRangeStart,
                  salaryRangeEnd,
                };
                axiosInstance
                  .post("/add-a-applied-job", data)
                  .then(() => {
                    setReloader(!reloader);
                    toast.success("Application Successful", {
                      position: "top-center",
                      autoClose: 2000,
                    });
                    mail();
                  })
                  .catch((error) => console.log(error));
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => console.log(error));
  };
  const mail = () => {
    emailjs
      .send(
        "service_g6cvxq2",
        "template_alsa7er",
        {
          inputEmail: user.email,
          user: user.displayName,
          jobTitle: job.jobTitle,
        },
        "7KRV2RNgMFhMkRBxQ"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <img className="w-full" src={banner} alt="" />

      <div className="w-[85%] mx-auto my-10 grid grid-cols-3 gap-8">
        <div className="">
          <img
            className="h-56 rounded-lg block"
            src={job.bannerImgURL}
            alt=""
          />
          <div className="border border-theme rounded-lg p-5 mt-10">
            <p className="text-2xl font-semibold mb-3">Job Details</p>
            <div className="flex gap-4 p-3">
              <CiLocationOn className="text-4xl"></CiLocationOn>
              <div className="">
                <p className="text-lg font-semibold">Address</p>
                <p className="text-slate-400">
                  Demo Address #8901 Marmora Road Chi Minh City, Vietnam
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3">
              <GrMoney className="text-xl"></GrMoney>
              <div className="">
                <p className="text-lg font-semibold">Salary Range</p>
                <p className="text-slate-400 flex items-center">
                  <FaBangladeshiTakaSign></FaBangladeshiTakaSign>
                  {job.salaryRangeStart} - {job.salaryRangeEnd}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3">
              <FiShield className="text-2xl"></FiShield>
              <div className="">
                <p className="text-lg font-semibold">Experience</p>
                <p className="text-slate-400">No Need</p>
              </div>
            </div>
          </div>

          <div className="border border-theme rounded-lg p-3 mt-10">
            <div className="flex flex-col items-center gap-4">
              <p className="text-2xl font-semibold mb-3">Company</p>
              <img
                className="w-14 h-14 rounded-full border border-theme"
                src={job.companyImgURL}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <p className="font-bold text-3xl">{job.jobTitle}</p>
          <p className="font-semibold mt-4">
            Deadline:{" "}
            <span className="bg-theme2 px-2 py-1 rounded-full text-white">
              {moment(job.applicationDeadline).format("Do MMM YY")}
            </span>
          </p>
          <p className="mt-8 text-2xl font-semibold tracking-widest border-b-2 border-theme pb-2 pl-2">
            Job Description
          </p>
          <p className="mt-4 text-justify text-slate-700">
            We are seeking a creative UI/UX Designer to craft intuitive,
            visually appealing, and user-centric digital experiences.
            Collaborate with cross-functional teams to conceptualize and design
            responsive web and mobile interfaces. Translate user needs into
            wireframes and prototypes, conduct usability testing, and refine
            designs for optimal user engagement. Stay updated on design trends
            and best practices, ensuring a seamless and delightful user journey.
            Proficiency in design tools, a strong eye for detail, and a
            portfolio showcasing your design prowess are essential. Join us in
            shaping cutting-edge user experiences that captivate and elevate our
            digital platforms.
          </p>

          <p className="mt-8 text-2xl font-semibold tracking-widest border-b-2 border-theme pb-2 pl-2">
            How to Apply
          </p>
          <p className="mt-4 text-justify text-slate-700">
            Just Click the <span className="font-black">Apply Now</span> button
            bellow
          </p>
          <p className="mt-8 text-2xl font-semibold tracking-widest border-b-2 border-theme pb-2 pl-2">
            Job Requirements
          </p>
          <ol className="list-decimal pl-8 space-y-3 text-slate-700">
            <li className="mt-4">Bachelor degree in related field required</li>
            <li>Strong problem-solving skills and adaptability</li>
            <li>Excellent communication and teamwork abilities</li>
            <li>Minimum of 3 years of relevant experience</li>
            <li>Proficiency in relevant software tools</li>
          </ol>
          <button
            onClick={apply}
            className="bg-theme font-semibold text-white px-4 py-2 rounded-full mt-8 duration-300 active:scale-90"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
