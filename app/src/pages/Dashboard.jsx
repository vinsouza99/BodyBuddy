import { useEffect } from "react";
import { useAuth } from "../AuthProvider.jsx";
import { setPageTitle } from "../utils.js";
import { ProxyServerExample } from "../components/ProxyServerExample.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
import { CssBaseline } from "@mui/material";

export const Dashboard = (props) => {
  const { user, handleSignOut } = useAuth();
  useEffect(() => {
    setPageTitle(props.title);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <>
          <h1>Dashboard</h1>
          <p>Signed in as: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <ProxyServerExample />
        </>
      </CssBaseline>
    </ThemeProvider>
  );
};
