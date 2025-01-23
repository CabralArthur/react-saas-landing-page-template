import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { RouteProtection } from "@/components/RouteProtection";
import PublicRoutes from "@/features/PublicRoutes";

import LandingPage from "@/features/LandingPage";
import LoginPage from "@/features/LoginPage";
import SignupPage from "@/features/SignupPage";
import NotFoundPage from "@/features/NotFoundPage/NotFoundPage";
import RequestPasswordResetPage from "@/features/RequestPasswordResetPage";
import ResetPasswordPage from "@/features/ResetPasswordPage";
import VerifyEmailPage from "@/features/VerifyEmailPage";
import ProfilePage from "@/features/ProfilePage/ProfilePage";
import SubscriptionPage from "@/features/SubscriptionPage";
import TeamSettingsPage from "@/features/TeamSettingsPage";
import ContactAdminPage from "@/features/ContactAdminPage";
import TeamUsersPage from "@/features/TeamUsersPage";
import HomePage from "@/features/HomePage/HomePage";

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
                        path: "/home",
                        element: <HomePage />,
                    },
                    {
                        path: "/profile",
                        element: <ProfilePage />,
                    },
                    {
                        path: "/subscribe",
                        element: <SubscriptionPage />,
                    },
                    {
                        path: "/team/settings",
                        element: <TeamSettingsPage />,
                    },
                    {
                        path: "/team/users",
                        element: <TeamUsersPage />,
                    },
                    {
                        path: "/contact-admin",
                        element: <ContactAdminPage />,
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
