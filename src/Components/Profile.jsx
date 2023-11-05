import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        alert("Logged Out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
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