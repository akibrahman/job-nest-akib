import axios from "axios";
import { signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthProvider";
// import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_serverUrl}`,
  withCredentials: true,
});
const useAxios = () => {
  const navigate = useNavigate();
  const { auth, setUser, setPrivateRouteLoader } = useContext(AuthContext);
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        // console.log("Tracked in the Axios Interceptor - ", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("useAxios Problem - ", error.response.status);
          signOut(auth)
            .then(() => {
              setUser(null);
              setPrivateRouteLoader(true);
              navigate("/login");
            })
            .catch();
        }
      }
    );
  }, [auth]);
  return axiosInstance;
};

export default useAxios;
