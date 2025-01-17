import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { RouteProtection } from "@/components/RouteProtection";
import { PublicRoutes } from "@/features/PublicRoutes/PublicRoutes";

import LandingPage from "@/features/LandingPage";
import LoginPage from "@/features/LoginPage";
import SignupPage from "@/features/SignupPage";
import TasksPage from "@/features/TasksPage";
import NotFoundPage from "@/features/NotFoundPage/NotFoundPage";
import RequestPasswordResetPage from "@/features/RequestPasswordResetPage";
import ResetPasswordPage from "@/features/ResetPasswordPage";
import VerifyEmailPage from "@/features/VerifyEmailPage";

export const router = createBrowserRouter([
    {
        element: <PublicRoutes />,
        children: [
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
                element: <SignupPage />,
            },
            {
                path: "/request-password-reset",
                element: <RequestPasswordResetPage />,
            },
            {
                path: "/reset-password/:token",
                element: <ResetPasswordPage />,
            },
            {
                path: "/verify-email/:token",
                element: <VerifyEmailPage />,
            }
        ]
    },
    {
        element: <App />,
        path: "/",
        children: [
            {
                element: <RouteProtection />,
                children: [
                    {
                        path: "/tasks",
                        element: <TasksPage />,
                    }
                ],
            }
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
