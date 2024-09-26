import React from "react";
import { useEffect } from "react";
import { setPageTitle } from "../utils.js";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
import { CssBaseline } from "@mui/material";

export const Profile = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <>
          <h1>Profile Page</h1>
        </>
      </CssBaseline>
    </ThemeProvider>
  );
};
