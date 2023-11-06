import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import AddJob from "./AddJob";
import AllJobs from "./AllJobs";
import AppliedJobs from "./AppliedJobs";
import EditJob from "./EditJob";
import JobDetailsPage from "./JobDetailsPage";
import Login from "./Login";
import MyJobs from "./MyJobs";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import Registration from "./Registration";
import TabWiseJobs from "./TabWiseJobs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: "/all-jobs",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "/my-jobs",
        element: (
          <PrivateRoute>
            <MyJobs></MyJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/applied-jobs",
        element: (
          <PrivateRoute>
            <AppliedJobs></AppliedJobs>
          </PrivateRoute>
        ),
      },
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
    ],
  },
]);
