import propTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import loader from "/infinite.svg";

const PrivateRoute = ({ children }) => {
  const { user, privateRouteLoader } = useContext(AuthContext);
  if (privateRouteLoader) {
    return (
      <img className="block mx-auto scale-125 my-32" src={loader} alt="" />
    );
  } else if (user) return children;
  return <Navigate to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: propTypes.node.isRequired,
};
export default PrivateRoute;
