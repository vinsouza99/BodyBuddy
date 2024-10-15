import { useState, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import theme from "../theme";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useAuth } from "../utils/AuthProvider.jsx";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";

// Links to display in the left Navbar
const NavBar = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "training",
    title: "Training",
    icon: <RunCircleIcon />,
  },
  {
    segment: "learn",
    title: "Learning",
    icon: <LocalLibraryIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    segment: "notifications",
    title: "Notifications",
    icon: <NotificationsIcon />,
  },
];

// Notifications Icon in Header
function Notification() {
  return (
    <>
      <div>
        <IconButton type="button" aria-label="search">
          <NotificationsIcon />
        </IconButton>
      </div>
    </>
  );
}

export const MainLayout = () => {
  // Set up routing
  // Navigate for navigation, Location for current URL info
  // Route paths are defined in App.jsx
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleSignOut } = useAuth();

  // Session State from Toolpad Core
  const [session] = useState({
    user: {
      name: user.user_metadata.full_name,
      email: user.email,
      image: user.user_metadata.avatar_url ? user.user_metadata.avatar_url : "",
    },
  });

  // Authentication logic from Toolpad Core
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        navigate("/");
      },
      signOut: () => {
        handleSignOut();
      },
    };
  }, []);

  // Router object that holds the current URL information
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
          logo: <img src="./src/assets/bodybuddy.svg" alt="BodyBuddy" />,
          title: "BodyBuddy",
        }}
        // Session and Authentication
        session={session}
        authentication={authentication}
        // Load NavBar and routing
        navigation={NavBar}
        router={router}
      >
        <DashboardLayout
          disableCollapsibleSidebar
          slots={{ toolbarActions: Notification }}
        >
          <Outlet />
          <Footer />
        </DashboardLayout>
      </AppProvider>
    </>
  );
};
