import PropTypes from "prop-types";
import { useEffect } from "react";
import { useAuth } from "../AuthProvider.jsx";
import { setPageTitle } from "../utils.js";
import { ProxyServerExample } from "../components/ProxyServerExample.jsx";

export const Dashboard = (props) => {
  const { user, handleSignOut } = useAuth();
  console.log(user);

  useEffect(() => {
    setPageTitle(props.title);

  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Hi! {user.user_metadata.full_name}</p>
      <button onClick={handleSignOut}>Sign Out</button>
      <ProxyServerExample />
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};
