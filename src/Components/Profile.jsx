import { useContext } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const Profile = () => {
  const { logout, setUser } = useContext(AuthContext);
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
    <div>
      <Helmet>
        <title>JobNest || Profile</title>
      </Helmet>
      <p>Profile</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white font-semibold px-4 py-1 rounded-lg mx-auto block"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
