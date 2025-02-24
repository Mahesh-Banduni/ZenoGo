import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";
import App from "./App";
import "./index.css";

// Loader component for Suspense fallback
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
  </div>
);

// Lazy load components
const RideSelection = lazy(() => import("./pages/RideSelection"));
const BookRide = lazy(() => import("./pages/BookRide"));
//const OlaMap = lazy(() => import("./pages/OlaMap"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Checkout = lazy(() => import("./pages/Checkout"));
// const AdminDashboard= lazy(() => import('./pages/AdminDashboard'));
// const Profile = lazy(() => import("./pages/Profile"));
// const Login = lazy(() => import("./pages/Login"));
// const Register = lazy(() => import("./pages/Register"));
// const ContactUs = lazy(() => import("./pages/ContactUs"));
// const AboutUs = lazy(() => import("./pages/AboutUs"));

// Router configuration
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <RideSelection />
          </Suspense>
        ),
      },
      {
        path: "/book-ride",
        element: (
          <Suspense fallback={<Loader />}>
            <BookRide />
          </Suspense>
        ),
      },
      // {
      //   path: "/olamap",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <OlaMap />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/cart",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Cart />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/checkout",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Checkout />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/profile",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Profile />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/login",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Login />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/register",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Register />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/contact",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <ContactUs />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/admin-dashboard",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <AdminDashboard />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "/about",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <AboutUs />
      //     </Suspense>
      //   ),
      // },
    ],
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>
);
