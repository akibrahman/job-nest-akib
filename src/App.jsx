import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="">
      <ToastContainer position="top-center" autoClose={2000} />
      <ToastContainer />
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
