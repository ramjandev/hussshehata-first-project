import DashboardLayout from "@/layout/DashboardLayout";
import ContentManagement from "@/pages/ContentManagement";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/login";
import NotFound from "@/pages/NotFound";
import PremiumFeatures from "@/pages/PremiumFeatures";
import ProgramDetail from "@/pages/ProgramDetail";
import ProgramManagement from "@/pages/ProgramManagement";
import UserManagement from "@/pages/UserManagement";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "user-management", element: <UserManagement /> },
              { path: "program-management", element: <ProgramManagement /> },
              {
                path: "program-management/:programId",
                element: <ProgramDetail />,
              },
              { path: "content-management", element: <ContentManagement /> },
              { path: "premium-features", element: <PremiumFeatures /> },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default routes;
