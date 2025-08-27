import Layout from "./pages/Login/Layout";
import SendOtp from "./pages/Login/SendOtp";
import VerifyOTP from "./pages/Login/VerifyOTP";
import Register from "./pages/Login/Register";
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <SendOtp /> },
      { path: "VerifyOTP", element: <VerifyOTP /> },
       { path: "Register", element: <Register /> },
    ],
  }
];
