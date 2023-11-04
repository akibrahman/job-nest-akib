import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div>
      <form className="border-2 w-[70%] mx-auto my-8 py-8 flex flex-col items-center gap-5">
        <p className="text-center">Registration</p>
        <input
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="Name"
          type="text"
        />
        <input
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="E-mail"
          type="email"
        />
        <input
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          type="file"
          name=""
        />
        <input
          className="bg-purple-400 placeholder:text-white text-white px-3 py-2 rounded-md"
          placeholder="Password"
          type="password"
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
