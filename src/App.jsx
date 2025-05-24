import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ThemeToggler from "./Theme";

const allRoutes = createBrowserRouter(
  [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/editprofile", element: <EditProfile /> },
  ],
  {
    basename: process.env.NODE_ENV === "production" ? "/Web" : "/",
  }
);


function App() {
  return (
    <>
      <RouterProvider router={allRoutes} />
      <ToastContainer position="top-center" autoClose={2000} />
      <ThemeToggler />
    </>
  );
}

export default App;
