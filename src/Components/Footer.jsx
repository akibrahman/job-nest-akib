import { AiOutlineGoogle } from "react-icons/ai";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import logo from "/logo.png";

const Footer = () => {
  return (
    <div className="flex p-20 bg-gradient-to-r from-theme to-theme2">
      <div className="w-[40%] space-y-5">
        <img className="w-44" src={logo} alt="" />
        <p className="leading-5">
          Discover your dream job on our platform, where opportunities meet
          ambition.
        </p>
        <div className="flex items-center gap-3">
          <input
            className=" border-2 bg-transparent px-6 py-2 rounded-full"
            type="email"
          />
          <button className="font-semibold bg-white px-3 py-1 rounded-full">
            Subscribe
          </button>
        </div>
        <div className="flex items-center gap-1">
          <AiOutlineGoogle className="w-11 h-11 p-3 rounded-full bg-white"></AiOutlineGoogle>
          <FaFacebookF className="w-11 h-11 p-3 rounded-full bg-white"></FaFacebookF>
          <BsInstagram className="w-11 h-11 p-3 rounded-full bg-white"></BsInstagram>
          <BsTwitter className="w-11 h-11 p-3 rounded-full bg-white"></BsTwitter>
        </div>
      </div>
      <div className="w-[35%]">
        <p className="text-2xl mb-10 font-medium">Frequently Asked Questions</p>
        <div className="flex justify-between">
          <div className="space-y-3 select-none">
            <p>Privacy & Seurioty</p>
            <p>Communication</p>
            <p>Lending Licences</p>
            <p>How it Works</p>
            <p>Under Writting</p>
            <p>Lending Licnses</p>
          </div>
          <div className="space-y-3 select-none">
            <p>Terms & Service</p>
            <p>Referral Terms</p>
            <p>Support</p>
            <p>For Employees</p>
            <p>Under Contact Us</p>
            <p>Support</p>
          </div>
        </div>
      </div>
      <div className="w-[25%] flex justify-center">
        <div>
          <p className="text-2xl mb-10 font-medium">Find Jobs</p>
          <div className="space-y-3 select-none">
            <p>Construction</p>
            <p>Referral Terms</p>
            <p>Support</p>
            <p>For Employees</p>
            <p>Under Contact Us</p>
            <p>Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
