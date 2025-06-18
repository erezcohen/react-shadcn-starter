import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import DataCenters from "./pages/DataCenters";
import Devices from "./pages/Devices";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/data-centers" replace />,
      },
      {
        path: "data-centers",
        element: <DataCenters />,
      },
      {
        path: "devices",
        element: <Devices />,
      },
    ],
  },
]);
