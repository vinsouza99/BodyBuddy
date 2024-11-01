import { useState, useMemo, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
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
import { getUser } from "../controllers/UserController.js";

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
  const [userInfo, setUserInfo] = useState({});
  const [logoSource, setLogoSource] = useState("./src/assets/bodybuddy.svg"); // COCOY: Default logo, will update based on screen size

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUser(user);
      setUserInfo(response);
    };
    getUserInfo();
  }, []);

  // Update logo based on screen size
  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 600) {
        setLogoSource("./src/assets/bodybuddy_logo_color.svg"); // Small logo for mobile
      } else {
        setLogoSource("./src/assets/bodybuddy.svg"); // Default logo
      }
    };

    // Set initial logo
    updateLogo();

    // Add resize event listener
    window.addEventListener("resize", updateLogo);
    return () => {
      window.removeEventListener("resize", updateLogo); // Clean up listener
    };
  }, []);

  // Session State from Toolpad Core
  const [session] = useState({
    user: {
      name: userInfo?.name,
      email: user.email,
      image: userInfo?.picture,
    },
  });

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
          slots={{ toolbarActions: Notification }}
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
