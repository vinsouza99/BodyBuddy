import React from "react";
import { useEffect } from "react";
import { setPageTitle } from "../utils";

export const NotFound = () => {
  useEffect(() => {
    setPageTitle(props.title);
  }, []);
  return <h1>404 Not Found</h1>;
};
