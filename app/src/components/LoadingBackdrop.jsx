import PropTypes from "prop-types";
import { Box, Backdrop, Typography } from "@mui/material";
import { CircularProgress } from "../components/CircularProgress.jsx";
import ProgramLoading from "../assets/ProgramLoading.gif";

export const LoadingBackdrop = ({ loading = false, generating = false }) => {
  return (
    <Backdrop
      open={loading || generating}
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}
    >
      <Box textAlign="center">
        {generating ? (
          <Box
            component="img"
            src={ProgramLoading}
            alt="Loading"
            sx={{
              width: "800px",
              maxWidth: "90%",
            }}
          />
        ) : (
          <CircularProgress color="inherit" />
        )}
        <Typography variant="h6" sx={{ mt: 2, whiteSpace: "pre-line" }}>
          {generating ? "" : "Loading..."}
        </Typography>
      </Box>
    </Backdrop>
  );
};

LoadingBackdrop.propTypes = {
  loading: PropTypes.bool.isRequired,
  generating: PropTypes.bool,
};

export default LoadingBackdrop;
