import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddJob from "./AddJob";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import Registration from "./Registration";
import TabWiseJobs from "./TabWiseJobs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: (
          <>
            <TabWiseJobs></TabWiseJobs>
          </>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-a-job",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/job",
    element: <AddJob></AddJob>,
  },
]);
