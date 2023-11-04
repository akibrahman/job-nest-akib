import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddJob from "./AddJob";
import Login from "./Login";
import Registration from "./Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <></>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/job",
    element: <AddJob></AddJob>,
  },
]);
