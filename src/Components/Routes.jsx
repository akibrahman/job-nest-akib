import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../Layouts/Dashboard";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import AddJob from "./AddJob";
import AllJobs from "./AllJobs";
import AllJobsAdmin from "./AllJobsAdmin";
import AppliedJobs from "./AppliedJobs";
import Blog from "./Blog";
import EditJob from "./EditJob";
import JobDetailsPage from "./JobDetailsPage";
import Login from "./Login";
import MyJobs from "./MyJobs";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import Registration from "./Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "all-jobs",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      // {
      //   path: "/profile",
      //   element: (
      //     <PrivateRoute>
      //       <Profile></Profile>
      //     </PrivateRoute>
      //   ),
      // },

      {
        path: "/job-details/:id",
        element: (
          <PrivateRoute>
            <JobDetailsPage></JobDetailsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/job-edit/:id",
        element: (
          <PrivateRoute>
            <EditJob></EditJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/Blogs",
        element: <Blog></Blog>,
      },
    ],
  },
  //! Admin
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "add-a-job",
        element: (
          <PrivateRoute>
            <AddJob></AddJob>
          </PrivateRoute>
        ),
      },
      {
        path: "all-jobs-admin",
        element: <AllJobsAdmin></AllJobsAdmin>,
      },
      //! USER
      {
        path: "applied-jobs",
        element: (
          <PrivateRoute>
            <AppliedJobs></AppliedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "my-jobs",
        element: (
          <PrivateRoute>
            <MyJobs></MyJobs>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
