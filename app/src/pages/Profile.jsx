import React from "react";
import { useEffect } from "react";
import { setPageTitle } from "../utils/utils";

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
