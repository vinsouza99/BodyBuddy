import PropTypes from "prop-types";
import { useEffect } from "react";
import { useAuth } from "../utils/AuthProvider.jsx";
import { setPageTitle } from "../utils/utils";
import { getResponse } from "../utils/openaiService.js";
export const Dashboard = (props) => {
  const { user, handleSignOut } = useAuth();

  useEffect(() => {
    setPageTitle(props.title);
    async function getGPTResponse(prompt) {
      const response = await getResponse(prompt);
      console.log(response);
    }
    getGPTResponse(
      "Give me the list of provinces of Canada with their respective capitals in JSON format"
    );
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
