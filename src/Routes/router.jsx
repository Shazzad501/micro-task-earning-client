import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'signUp',
        element: <SignUp/>
      },
      {
        path: 'signIn',
        element: <SignIn/>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout/>
  }
]);

export default router;