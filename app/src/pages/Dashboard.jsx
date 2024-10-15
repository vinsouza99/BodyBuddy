import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
export const Dashboard = (props) => {
  const { user, handleSignOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle(props.title);
  }, []);

  useEffect(() => {
    if (window.location.href.includes('#')) {
      navigate(window.location.pathname, { replace: true });
    }
  }, [navigate]);

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
