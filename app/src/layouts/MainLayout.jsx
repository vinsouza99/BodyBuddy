import { useState, useMemo, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { Footer } from "../components/Footer";
import theme from "../theme";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useAuth } from "../utils/AuthProvider.jsx";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import Notifications from "../components/Notifications.jsx";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { getUser } from "../controllers/UserController.js";
import "./MainLayout.css";

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
    segment: "learning",
    title: "Learning",
    icon: <LocalLibraryIcon />,
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
];

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleSignOut } = useAuth();

  // Session State from Toolpad Core
  const [session, setSession] = useState({
    user: {
      name: "",
      email: "",
      image: "",
    },
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUser(user, false);
      setSession({
        user: {
          name: response.name,
          email: user.email,
          image: response.picture,
        },
      });
    };
    getUserInfo();
  }, []);
  // Use useMediaQuery to define screen width
  const isMobile = useMediaQuery("(max-width:600px)");

  // Set logo source based on screen size
  const logoSource = isMobile
    ? "./src/assets/bodybuddy_logo_color.svg"
    : "./src/assets/bodybuddy.svg";

  // Authentication logic from Toolpad Core
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        navigate("/dashboard");
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
          logo: <img src={logoSource} alt="BodyBuddy" />,
          title: "",
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
          slots={{ toolbarActions: Notifications }}
          sx={{ position: "relative" }}
        >
          <Box sx={{ margin: 2, minHeight: "calc(100vh - 180px)" }}>
            <Outlet />
          </Box>
          <Footer />
        </DashboardLayout>
      </AppProvider>
    </>
  );
};
