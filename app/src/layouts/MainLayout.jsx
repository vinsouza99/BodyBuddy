import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import theme from "../theme";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import "./MainLayout.css";

// Links to display in the left Navbar
const NavBar = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountBoxIcon />,
  },
  {
    segment: "training",
    title: "Training",
    icon: <RunCircleIcon />,
  },
  {
    segment: "learn",
    title: "Learn",
    icon: <LocalLibraryIcon />,
  },
];

export const MainLayout = () => {
  // Set up routing
  // Navigate for navigation, Location for current URL info
  // Route paths are defined in App.jsx
  const navigate = useNavigate();
  const location = useLocation();

  const router = {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path) => {
      navigate(path);
    },
  };

  return (
    <>
      <AppProvider
        // Use theme.js
        theme={theme}
        // Display branding
        branding={{
          logo: <img src="./src/assets/react.svg" alt="BodyBuddy" />,
          title: "BodyBuddy",
        }}
        // Load NavBar and routing
        navigation={NavBar}
        router={router}
      >
        <DashboardLayout>
          <Outlet />
          <Footer />
        </DashboardLayout>
      </AppProvider>
    </>
  );
};
