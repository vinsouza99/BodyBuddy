import { useAuth } from "../AuthProvider.jsx";
import { ProxyServerExample } from "../components/ProxyServerExample.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
import { CssBaseline } from "@mui/material";

export const Dashboard = () => {
  const { user, handleSignOut } = useAuth();

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
