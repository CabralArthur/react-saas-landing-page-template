import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/features/LandingPage";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    // {
    //   path: "/",
    //   element: <App />,
    //   children: [
    //     {
    //       element: <RouteProtection />, //Adicionar protecao de rota
    //       children: [
    //         {
    //           path: "home",
    //           element: <HomeContainer />,
    //           index: true
    //         },
    //         {
    //           path: "campaigns-details/:campaignId",
    //           element: <InfoLayout />,
    //           children: [
    //             {
    //               path: "dashboards",
    //               element: <Dashboards />
    //             },
    //             {
    //               path: "offers",
    //               element: <OffersContainer />
    //             },
    //             {
    //               path: "participants",
    //               element: <ParticipantsContainer />
    //             }
    //           ]
    //         },
    //         {
    //           path: "users",
    //           element: <UsersContainer />
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]);
