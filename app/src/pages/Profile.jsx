import React from "react";
import { useEffect } from "react";
import { setPageTitle } from "../utils.js";

export const Profile = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, []);
  return (
    <>
      <h1>Profile Page</h1>
    </>
  );
};
