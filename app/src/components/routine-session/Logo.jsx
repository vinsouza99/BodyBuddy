import PropTypes from "prop-types";
import { Box } from "@mui/material";
import LogoImageWhite from "/assets/bodybuddy_logo_white.svg";
import LogoImageColor from "/assets/bodybuddy_logo_color.svg";

export const Logo = ({ color = true }) => {
  return (
    <Box
      component="img"
      src={color ? LogoImageColor : LogoImageWhite}
      alt="BodyBuddy"
      sx={{
        position: "absolute",
        top: "10px",
        left: "10px",
        width: "50px",
        height: "50px",
        objectFit: "contain",
        zIndex: 1500,
      }}
    />
  );
};

Logo.propTypes = {
  color: PropTypes.bool,
};
