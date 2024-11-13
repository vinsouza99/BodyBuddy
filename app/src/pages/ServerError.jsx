import React from "react";
import { useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

export const ServerError = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorDetails = location.errorDetails;
  useEffect(() => {
    setPageTitle(props.title);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1">Server Error</Typography>
        <Typography variant="body1">
          {errorDetails
            ? errorDetails
            : "Something bad happened on our servers... Try again later."}
        </Typography>
        <Box>
          <Button variant="contained" onClick={() => navigate("/dashboard")}>
            Back to home
          </Button>
        </Box>
      </Box>
    </>
  );
};
