import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="">
      <ToastContainer position="top-left" autoClose={2000} />
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
