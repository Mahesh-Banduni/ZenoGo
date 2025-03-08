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
const Home= lazy(()=> import("./pages/Home"))
const RideSelection = lazy(() => import("./pages/RideSelection"));
const BookRide = lazy(() => import("./pages/BookRide"));
const AllRides = lazy(() => import("./pages/AllRides"));
const ProfileSettings= lazy(()=> import("./pages/ProfileSettings"))
const ActiveRides = lazy(() => import("./pages/ActiveRides"));
const RidesHistory= lazy(() => import('./pages/RidesHistory'));
// const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
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
            <Home />
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
      {
        path: "/select-ride",
        element: (
          <Suspense fallback={<Loader />}>
            <RideSelection />
          </Suspense>
        ),
      },
      {
        path: "/all-rides",
        element: (
          <Suspense fallback={<Loader />}>
            <AllRides />
          </Suspense>
        ),
      },
      {
        path: "/profile-settings",
        element: (
          <Suspense fallback={<Loader />}>
            <ProfileSettings />
          </Suspense>
        ),
      },
      {
        path: "/active-rides",
        element: (
          <Suspense fallback={<Loader />}>
            <ActiveRides />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/rides-history",
        element: (
          <Suspense fallback={<Loader />}>
            <RidesHistory />
          </Suspense>
        ),
      },
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
