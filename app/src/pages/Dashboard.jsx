import PropTypes from "prop-types";
import { useEffect } from "react";
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";

export const Dashboard = (props) => {
  const { user, handleSignOut } = useAuth();

  useEffect(() => {
    setPageTitle(props.title);
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Hi! {user.user_metadata.full_name}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};
