import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";
import logo from "/logo.png";

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

      <div className="w-full py-16 md:py-28 lg:py-36 bg-login bg-center bg-cover">
        <div className="h-full w-full flex flex-col md:flex-row gap-10 md:gap-0 px-4 items-center justify-around">
          <div className="w-full md:w-[40%] space-y-8 bg-theme p-8 rounded-lg">
            <img className="w-1/2" src={logo} alt="" />
            <p className="text-5xl font-semibold text-white">
              Login To You Now
            </p>
            <p className="text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              omnis quisquam maiores aperiam. Quibusdam
            </p>
          </div>
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg">
            <p className="text-stone-500">
              If you have an Account with us, Please Log in
            </p>
            <div className="flex flex-col gap-2 mt-8">
              <label className="font-semibold">E-mail Address</label>
              <input
                required
                className="focus:outline-none bg-stone-200 px-4 py-2 rounded-full text-theme"
                type="email"
                name="email"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label className="font-semibold">Password</label>
              <input
                className="focus:outline-none bg-stone-200 px-4 py-2 rounded-full text-theme"
                type="password"
                name="password"
              />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <button
                type="submit"
                className="font-semibold text-white bg-theme px-5 py-2 rounded-full active:scale-90 duration-300"
              >
                Login
              </button>
              <Link to="/registration">
                <button>
                  or,{" "}
                  <span className="font-medium text-theme">Registration</span>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
