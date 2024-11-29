import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Box, List, ListItem, Typography, Divider } from "@mui/material";
import FocusAreaIcon from "/assets/icon-focus-area.svg";
import GoalIcon from "/assets/icon-goal.svg";

export const ExerciseDetails = ({ exercise } = {}) => {
  const [executionSteps, setExecutionSteps] = useState("");
  const [focusAreas, setFocusAreas] = useState("");
  const [goals, setGoals] = useState("");

  useEffect(() => {
    if (!exercise || Object.keys(exercise).length === 0) return;
    const focusAreas =
      exercise?.muscleGroups?.map((group) => group.name).join(", ") || "None";
    setFocusAreas(focusAreas);
    const goals =
      exercise?.goals?.map((goal) => goal.name).join(", ") || "None";
    setGoals(goals);
    const executionSteps = exercise?.execution_steps || [];
    setExecutionSteps(executionSteps);
  }, [exercise]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <Divider
        sx={{
          backgroundColor: "background.light",
          height: "2px",
          marginBottom: "1rem",
        }}
      />

      <List>
        {executionSteps.length > 0
          ? executionSteps.map((step, index) => (
              <ListItem sx={{ padding: "0", marginBottom: "1rem" }} key={index}>
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "24px",
                    height: "24px",
                    minWidth: "24px",
                    minHeight: "24px",
                    border: "1px solid",
                    borderRadius: "50%",
                    marginRight: "0.75rem",
                  }}
                >
                  {index + 1}
                </Box>
                <Typography component="span">{step}</Typography>
              </ListItem>
            ))
          : ""}
      </List>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        {/* Display Focus Area */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            borderColor: "text.primary",
            color: "text.primary",
            width: "100%",
            border: "1px solid",
            borderRadius: "8px",
            padding: "0.75rem",
            gap: "0.5rem",
          }}
        >
          <img
            src={FocusAreaIcon}
            alt="Focus Area Icon"
            style={{ width: "24px", height: "24px" }}
          />
          <Box>
            <Box
              component="p"
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                margin: "0",
                fontSize: "1rem",
              }}
            >
              Focus Areas
            </Box>
            <Box
              component="p"
              sx={{ lineHeight: "1.2", margin: "0", fontSize: "0.9rem" }}
            >
              {focusAreas}
            </Box>
          </Box>
        </Box>

        {/* Display Goals */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            borderColor: "text.primary",
            color: "text.primary",
            width: "100%",
            border: "1px solid",
            borderRadius: "8px",
            padding: "0.75rem",
            gap: "0.5rem",
          }}
        >
          <img
            src={GoalIcon}
            alt="Goal Icon"
            style={{ width: "24px", height: "24px" }}
          />
          <Box>
            <Box
              component="p"
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                margin: "0",
                fontSize: "1rem",
              }}
            >
              Goals
            </Box>
            <Box
              component="p"
              sx={{ lineHeight: "1.2", margin: "0", fontSize: "0.9rem" }}
            >
              {goals}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

ExerciseDetails.propTypes = {
  exercise: PropTypes.object,
};
