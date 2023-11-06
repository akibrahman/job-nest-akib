import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (event) => {
    event.preventDefault();
    const data = event.target;
    login(data.email.value, data.password.value)
      .then(() => {
        toast.success("Successfully LoggedIn", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        if (error.code == "auth/invalid-login-credentials") {
          toast.error("Invalid User or Password", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>JobNest || Login</title>
      </Helmet>
      <form
        onSubmit={handleLogin}
        className="border-2 w-[70%] mx-auto my-8 py-8 flex flex-col items-center gap-5"
      >
        <p className="text-center">Login</p>
        <input
          required
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="Email"
          type="email"
          name="email"
        />
        <input
          required
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="Password"
          type="password"
          name="password"
        />
        <input
          className="bg-purple-400 font-semibold text-white px-4 py-1 rounded-full"
          type="submit"
          value="Login"
        />
      </form>
      <Link to="/registration">
        <p className="text-center">Registration</p>
      </Link>
    </div>
  );
};

export default Login;
