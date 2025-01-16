import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/features/LandingPage";
import LoginPage from "@/features/LoginPage/LoginPage";
import SignupPage from "@/features/SignupPage";
import PasswordResetPage from "@/features/PasswordResetPage";
import NotFoundPage from "@/features/NotFoundPage";
import RequestPasswordResetPage from "@/features/RequestPasswordResetPage";
import EmailVerificationPage from "@/features/EmailVerificationPage";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/password-reset",
        element: <PasswordResetPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    },
    {
        path: "/request-password-reset",
        element: <RequestPasswordResetPage />
    },
    {
        path: "/email-verification",
        element: <EmailVerificationPage />
    },
    // {
    //   path: "/",
    //   element: <App />,
    //   children: [
    //     {
    //       element: <RouteProtection />,
    //       children: [
    //         {
    //           path: "home",
    //           element: <HomeContainer />,
    //           index: true
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]);
