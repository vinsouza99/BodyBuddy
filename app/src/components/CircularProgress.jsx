import { Box } from "@mui/material";
import GeneralLoading from "/assets/GeneralLoading.gif";

export const CircularProgress = () => {
  return (
    <Box
      component="img"
      src={GeneralLoading}
      alt="Loading"
      sx={{
        width: "450px",
        maxWidth: "100%",
      }}
    />
  );
};
