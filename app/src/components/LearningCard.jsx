import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

export const LearningCard = () => {
  return (
    <Card>
      <Box>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/l83R5PblSMA?si=zzL5BQWGDRfEkniK"
          title="Barbell Squat"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Box>

      <CardContent>
        <Typography variant="h3" textAlign="left" sx={{ marginBottom: 2 }}>
          Barbell Squat
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip label="Legs" variant="outlined" />
          <Chip label="Intermediate" variant="outlined" />
          <Chip label="Relaxing" variant="outlined" />
        </Box>
      </CardContent>
    </Card>
  );
};
