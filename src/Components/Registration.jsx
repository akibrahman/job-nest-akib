import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Registration = () => {
  const { registration, auth, authReloader, setAuthReloader } =
    useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
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
                alert("Registered");
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
      <form
        onSubmit={handleSubmit}
        className="border-2 w-[70%] mx-auto my-8 py-8 flex flex-col items-center gap-5"
      >
        <p className="text-center">Registration</p>
        <input
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="Name"
          type="text"
          name="name"
        />
        <input
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="E-mail"
          type="email"
          name="email"
        />
        <div className="flex items-center gap-6">
          <input
            onChange={handleInput}
            className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
            type="file"
            name="file"
          />
          <img className="w-12 h-12 rounded-full" src={preview} alt="" />
        </div>
        <input
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="Password"
          type="password"
          name="password"
        />
        <input
          className="bg-purple-400 font-semibold text-white px-4 py-1 rounded-full"
          type="submit"
          value="Register"
        />
      </form>
      <Link to="/login">
        <p className="text-center">Login</p>
      </Link>
    </div>
  );
};

export default Registration;
