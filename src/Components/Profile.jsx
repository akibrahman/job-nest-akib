import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const Profile = () => {
  const { logout, setUser, user, auth, authReloader, setAuthReloader } =
    useContext(AuthContext);
  const updateModal = useRef();
  const [ppFile, setPpFile] = useState();
  const [ppPreview, setPpPreview] = useState(null);

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

  const handleBannerImgInput = async (event) => {
    setPpFile(event.target.files[0]);
    const base64 = await convertBase64(event.target.files[0]);
    setPpPreview(base64);
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

  const showModal = () => {
    updateModal.current.classList.remove("hidden");
  };
  const hideModal = () => {
    updateModal.current.classList.add("hidden");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const isNewPpImg = await checker(ppFile);
    const imgLink = isNewPpImg ? isNewPpImg : user.photoURL;
    updateProfile(auth.currentUser, {
      displayName: event.target.name.value,
      photoURL: imgLink,
    }).then(() => {
      toast.success("Profile Updated", {
        position: "top-center",
        autoClose: 2000,
      });
      setAuthReloader(!authReloader);
      hideModal();
    });
  };
  const handleLogout = () => {
    logout()
      .then(() => {
        setUser(null);
        toast.success("Successfully Logged Out", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative mb-32">
      <Helmet>
        <title>JobNest || Profile</title>
      </Helmet>
      {/* Modal  */}
      <div
        ref={updateModal}
        className="hidden absolute h-screen w-full bg-[rgba(0,0,0,0.9)] flex items-center justify-center z-50 duration-300 ease-linear"
      >
        <form
          onSubmit={handleUpdate}
          className="w-[95%] lg:w-1/2 py-10 md:py-20 lg:py-32 bg-white rounded-lg shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center my-10 justify-center gap-6 px-10">
            <img
              className="w-56 h-56 rounded-lg"
              src={ppPreview ? ppPreview : user.photoURL}
              alt=""
            />
            <div className="font-semibold space-y-3">
              <input
                className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full w-full"
                type="text"
                name="name"
                defaultValue={user.displayName}
              />
              <input
                className="border-2 border-theme focus:outline-none font-semibold px-3 py-2 rounded-full w-full"
                onChange={handleBannerImgInput}
                type="file"
              />
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-theme text-white font-semibold px-4 py-1 rounded-full active:scale-90 duration-300"
            >
              Update
            </button>
            <p
              onClick={hideModal}
              className="bg-red-500 text-white font-semibold px-4 py-1 rounded-full active:scale-90 duration-300 cursor-pointer select-none"
            >
              Cancel
            </p>
          </div>
        </form>
      </div>
      {/* Modal  */}

      <div className="bg-banner flex items-center justify-center">
        <div className="shadow-xl h-full w-full bg-[rgba(0,0,0,0.8)] py-6">
          <p className="text-center text-4xl font-semibold text-white">
            My Profile
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center my-10 justify-center gap-6">
        <img className="w-56 h-56 rounded-lg" src={user.photoURL} alt="" />
        <div className="font-semibold space-y-3">
          <p className="border-2 border-theme px-4 py-2 rounded-full">
            {user.displayName}
          </p>
          <p className="border-2 border-theme px-4 py-2 rounded-full">
            {user.email}
          </p>
          <p className="border-2 border-theme px-4 py-2 rounded-full">
            Created At:{" "}
            {user.metadata.creationTime.split(" ").slice(0, 4).join(" ")}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <button
          onClick={showModal}
          className="bg-theme text-white font-semibold px-4 py-1 rounded-full active:scale-90 duration-300"
        >
          Update
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white font-semibold px-4 py-1 rounded-full active:scale-90 duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
