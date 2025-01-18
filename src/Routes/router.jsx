import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageTasks from "../Pages/Dashboard/Admin/ManageTasks";
import BuyerHome from "../Pages/Dashboard/Buyer/BuyerHome";
import AddNewTask from "../Pages/Dashboard/Buyer/AddNewTask";
import MyTasks from "../Pages/Dashboard/Buyer/MyTasks";
import PurchaseCoin from "../Pages/Dashboard/Buyer/PurchaseCoin";
import WorkerHome from "../Pages/Dashboard/Worker/WorkerHome";
import TaskList from "../Pages/Dashboard/Worker/TaskList";
import Submissions from "../Pages/Dashboard/Worker/Submissions";
import WithDraw from "../Pages/Dashboard/Worker/WithDraw";
import PaymentHistory from "../Pages/Dashboard/Buyer/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import BuyerRoute from "./BuyerRoute";
import TaskDetails from "../Pages/Dashboard/Worker/TaskDetails";


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
      },
      {
        path: 'tasks/:id',
        element: <TaskDetails/>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout/>,
    children: [
      // Admin routes
      {
        path: 'admin-home',
        element: <AdminHome/>
      },
      {
        path: 'manage-users',
        element: <ManageUsers/>
      },
      {
        path: 'manage-task',
        element: <ManageTasks/>
      },

      // Buyer routes
      {
        path: 'buyer-home',
        element: <PrivateRoute><BuyerHome/></PrivateRoute>
      },
      {
        path: 'add-task',
        element: <PrivateRoute><AddNewTask/></PrivateRoute>
      },
      {
        path: 'buyer-task',
        element: <PrivateRoute><MyTasks/></PrivateRoute>
      },
      {
        path: 'purchase-coin',
        element: <PrivateRoute><PurchaseCoin/></PrivateRoute>
      },
      {
        path: 'payment-history',
        element: <PrivateRoute><PaymentHistory/></PrivateRoute>
      },
      
      // Worker routes

      {
        path: 'worker-home',
        element:<WorkerHome/>
      },
      {
        path: 'task-list',
        element:<TaskList/>
      },
      {
        path: 'worker-submission',
        element:<Submissions/>
      },
      {
        path: 'withdraw',
        element:<WithDraw/>
      }
    ]
  }
]);

export default router;