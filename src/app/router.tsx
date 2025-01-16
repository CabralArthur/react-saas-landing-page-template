import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import LandingPage from "@/features/LandingPage";
import LoginPageContainer from "@/features/LoginPage";
import SignupContainer from "@/features/SignupPage";
import TasksContainer from "@/features/Tasks/";
import NotFoundPage from "@/features/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPageContainer />,
  },
  {
    path: "/signup",
    element: <SignupContainer />,
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
