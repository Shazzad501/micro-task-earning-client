import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
  },
  {
    path: 'dashboard',
    element: <DashboardLayout/>
  }
]);

export default router;