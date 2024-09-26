import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme.js";
import { CssBaseline } from "@mui/material";

export const Profile = () => {
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
