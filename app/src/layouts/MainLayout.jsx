import React from "react";
import { Outlet } from "react-router-dom";
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
        // Load NavBar
        navigation={NavBar}
      >
        <DashboardLayout>
          <Outlet />
          <Footer />
        </DashboardLayout>
      </AppProvider>
    </>
  );
};
