import PropTypes from "prop-types";
import { Button, Typography, Box } from "@mui/material";
import { GadgetBase } from "./GadgetBase";

export const GadgetRegenerateProgram = ({ handleGenerateProgram }) => {
  return (
    <GadgetBase>
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Typography
          variant="h6"
          sx={{ width: "100%", textAlign: "left", fontWeight: "800", whiteSpace: "nowrap" }}
        >
          Program Complete!
        </Typography>
        <Typography sx={{ width: "100%", textAlign: "left" }}>
          Create a new exercise plan based on your recent fitness growth.
        </Typography>
      </Box>
      <Button
        onClick={handleGenerateProgram}
        size="large"
        sx={{
          width: "150px",
          height: "150px",
          color: "white",
          background: "linear-gradient(180deg, #2D90E0 0%, #FF118C 100%)",
          borderRadius: "50%",
          padding: 0,
          minWidth: "unset",
          fontSize: "1.2rem",
          fontWeight: "bold",
          marginTop: "0.8rem",
          marginBottom: "0.8rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        CREATE PROGRAM
      </Button>
    </GadgetBase>
  );
};

GadgetRegenerateProgram.propTypes = {
  handleGenerateProgram: PropTypes.func,
};
