import { useEffect } from "react";
import { useAuth } from "../AuthProvider.jsx";
import { setPageTitle } from "../utils.js";
import { ProxyServerExample } from "../components/ProxyServerExample.jsx";

export const Dashboard = (props) => {
  const { user, handleSignOut } = useAuth();
  useEffect(() => {
    setPageTitle(props.title);
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <p>Signed in as: {user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
      <ProxyServerExample />
    </>
  );
};
