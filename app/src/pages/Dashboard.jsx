import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from "../utils/utils";
export const Dashboard = (props) => {
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
    </>
  );
};

Dashboard.propTypes = {
  title: PropTypes.string,
};
