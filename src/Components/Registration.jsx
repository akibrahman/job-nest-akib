import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";
import logo from "/logo.png";

const Registration = () => {
  const { registration, auth, authReloader, setAuthReloader } =
    useContext(AuthContext);
  const spinner = useRef();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const passwordPatternL = /.*[A-Z].*/;
  const passwordPatternN = /.*[0-9].*/;
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
    spinner.current.classList.remove("hidden");
    const data = event.target;
    if (data.password.value.length < 6) {
      toast.info("Password should be in 6 chars", {
        position: "top-center",
        autoClose: 3000,
      });
      spinner.current.classList.add("hidden");
      return;
    }
    if (!passwordPatternL.test(data.password.value)) {
      toast.info("Password should have atlest one Capital Letter", {
        position: "top-center",
        autoClose: 3000,
      });
      spinner.current.classList.add("hidden");
      return;
    }
    if (!passwordPatternN.test(data.password.value)) {
      toast.info("Password should have atlest one Number", {
        position: "top-center",
        autoClose: 3000,
      });
      spinner.current.classList.add("hidden");
      return;
    }

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
                spinner.current.classList.add("hidden");
                navigate("/");
              })
              .catch((error) => {
                toast.error(error.code, {
                  position: "top-center",
                  autoClose: 2000,
                });
                spinner.current.classList.add("hidden");
              });
          })
          .catch((error) => {
            toast.error(error.code, {
              position: "top-center",
              autoClose: 2000,
            });
            spinner.current.classList.add("hidden");
          });
      });
  };
  return (
    <div>
      <Helmet>
        <title>JobNest || Registration</title>
      </Helmet>
      <div className="w-full py-16 md:py-28 lg:py-36 bg-login bg-center bg-cover">
        <div className="h-full w-full flex flex-col md:flex-row-reverse gap-10 md:gap-0 px-4 items-center justify-around">
          <div className="w-full md:w-[40%] space-y-8 bg-gradient-to-l from-theme to-theme2 p-8 rounded-lg">
            <img className="w-1/2" src={logo} alt="" />
            <p className="text-5xl font-semibold text-white">
              Register to Join
            </p>
            <p className="text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              omnis quisquam maiores aperiam. Quibusdam
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full lg:w-auto p-8 rounded-lg"
          >
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
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="font-semibold text-white bg-theme px-5 py-2 rounded-full active:scale-90 duration-300"
                >
                  Register
                </button>
                <div ref={spinner} className="hidden">
                  <TailSpin
                    height="30"
                    width="30"
                    color="#F0AA14"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              </div>
              <Link to="/login">
                <button>
                  or, <span className="font-medium text-theme">Login</span>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
