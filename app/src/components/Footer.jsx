import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export const Footer = () => {
  return (
    <Box display="flex" justifyContent="center" sx={{ padding: 4 }}>
      <Typography variant="body2" color="text.primary">
        <Link href="#" sx={{ marginRight: 2 }}>
          Privacy Policy
        </Link>
        <Link href="#" sx={{ marginRight: 2 }}>
          Terms of Service
        </Link>
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ marginRight: 2 }}>
        Version 1.0
      </Typography>
      <Typography variant="body2" color="text.primary">
        ©2024 BodyBuddy
      </Typography>
    </Box>
  );
};
