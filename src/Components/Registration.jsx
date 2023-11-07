import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";
import logo from "/logo.png";

const Registration = () => {
  const { registration, auth, authReloader, setAuthReloader } =
    useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
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
  //! Profile Picture Preview
  const handleInput = async (event) => {
    setFile(event.target.files[0]);
    const base64 = await convertBase64(event.target.files[0]);
    setPreview(base64);
  };
  //! Registration
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = event.target;
    const imgData = new FormData();
    imgData.append("image", file);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=f8c09563e2c3334b8e3c08a6de7d30df",
        imgData
      )
      .then((res) => {
        registration(data.email.value, data.password.value)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: data.name.value,
              photoURL: res.data.data.display_url,
            })
              .then(() => {
                setAuthReloader(!authReloader);
                toast.success("Successfully Registered", {
                  position: "top-center",
                  autoClose: 2000,
                });
                navigate("/");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };
  return (
    <div>
      <Helmet>
        <title>JobNest || Registration</title>
      </Helmet>
      <div className="w-full h-[calc(100vh-54px)] bg-login bg-center bg-cover">
        <div className="h-full w-full bg[rgba(240,170,20,0.5)] flex flex-row-reverse items-center justify-around">
          <div className="w-[40%] space-y-8 bg-gradient-to-l from-theme to-theme2 p-8 rounded-lg">
            <img className="w-1/2" src={logo} alt="" />
            <p className="text-5xl font-semibold text-white">
              Register to Join
            </p>
            <p className="text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              omnis quisquam maiores aperiam. Quibusdam
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg">
            <p className="text-stone-500">
              If you have an Account with us, Please Log in
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-semibold">Your Name</label>
              <input
                required
                className="focus:outline-none bg-stone-200 px-4 py-2 rounded-full text-theme"
                type="text"
                name="name"
              />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-semibold">E-mail Address</label>
              <input
                required
                className="focus:outline-none bg-stone-200 px-4 py-2 rounded-full text-theme"
                type="email"
                name="email"
              />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-semibold">Profile Picture</label>
              <div className="flex items-center gap-4">
                <input
                  required
                  onChange={handleInput}
                  className="focus:outline-none bg-stone-200 px-4 py-2 rounded-full text-theme"
                  type="file"
                  name="file"
                />
                <img
                  className={`${preview && "w-10 h-10 rounded-full"}`}
                  src={preview}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-semibold">Password</label>
              <input
                required
                className="focus:outline-none bg-stone-200 px-4 py-2 rounded-full text-theme"
                type="password"
                name="password"
              />
            </div>
            <div className="flex gap-4 items-center mt-2">
              <label className="font-semibold">Accept our Aggrement</label>
              <input required className="" type="checkbox" />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <button
                type="submit"
                className="font-semibold text-white bg-theme px-5 py-2 rounded-full active:scale-90 duration-300"
              >
                Register
              </button>
              <Link to="/login">
                <button>
                  or, <span className="font-medium text-theme">Login</span>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* <form
        onSubmit={handleSubmit}
        className="border-2 w-[70%] mx-auto my-8 py-8 flex flex-col items-center gap-5"
      >
        <p className="text-center">Registration</p>
        <input
          required
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="Name"
          type="text"
          name="name"
        />
        <input
          required
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="E-mail"
          type="email"
          name="email"
        />
        <div className="flex items-center gap-6">
          <input
            required
            onChange={handleInput}
            className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
            type="file"
            name="file"
          />
          <img className="w-12 h-12 rounded-full" src={preview} alt="" />
        </div>
        <input
          required
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="Password"
          type="password"
          name="password"
        />
        <input required type="checkbox" />
        <input
          className="bg-purple-400 font-semibold text-white px-4 py-1 rounded-full"
          type="submit"
          value="Register"
        />
      </form> */}
    </div>
  );
};

export default Registration;
