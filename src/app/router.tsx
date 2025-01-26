import { createBrowserRouter } from "react-router-dom";

import LandingPage from "@/features/LandingPage";

export const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <LandingPage />,
            }
        ]
    },
    {
        path: "*",
        element: <LandingPage />
    },
]);
