import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import LandingPage from "@/features/LandingPage";
import LoginPage from "@/features/LoginPage";
import SignupContainer from "@/features/SignupPage";
import TasksContainer from "@/features/Tasks/";
import NotFoundPage from "@/features/NotFoundPage/NotFoundPage";
import RequestPasswordResetContainer from "@/features/RequestPasswordResetPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupContainer />,
  },
  {
    path: "/request-password-reset",
    element: <RequestPasswordResetContainer />,
  },
  {
    element: <App />,
    children: [
      {
        path: "/tasks",
        element: <TasksContainer />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
