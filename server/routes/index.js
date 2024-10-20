import express from "express";
import userRoutes from "./userRoutes.js";
import programRoutes from "./programRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import routineExerciseRoutes from "./routineExerciseRoutes.js";
import routineRoutes from "./routineRoutes.js";
import historyRoutes from "./historyRoutes.js";
import authenticateToken from "../authenticateToken.js";
import goalRoutes from "./goalRoutes.js";
import userGoalRoutes from "./userGoalRoutes.js";
import achievementRoutes from "./achievementRoutes.js";
import relatedAchievementRoutes from "./relatedAchievementRoutes.js";
import muscleGroupRoutes from "./relatedMuscleGroupRoutes.js";
import relatedMuscleGroupRoutes from "./relatedMuscleGroupRoutes.js";
import openaiapiRoutes from "./openaiapiRoutes.js";
import userSettingsRoutes from "./userSettingsRoutes.js";
import userProgressRoutes from "./userProgressRoutes.js";

const router = express.Router();

router.use("/users", authenticateToken, userRoutes);
router.use("/programs", authenticateToken, programRoutes);
router.use("/exercises", authenticateToken, exerciseRoutes);
router.use("/routines", authenticateToken, routineRoutes);
router.use("/routineExercises", authenticateToken, routineExerciseRoutes);
router.use("/log", authenticateToken, historyRoutes);
router.use("/goals", goalRoutes);
router.use("/user_goals", userGoalRoutes);
router.use("/achievements", achievementRoutes);
router.use("/related_achievements", relatedAchievementRoutes);
router.use("/muscleGroups", muscleGroupRoutes);
router.use("/relatedMuscleGroups", relatedMuscleGroupRoutes);
router.use("/openai", authenticateToken, openaiapiRoutes);
router.use("/user_settings", userSettingsRoutes);
router.use("/user_progress", userProgressRoutes);

// set-cookie endpoint for Access Token (JWT)
router.post("/set-cookie", (req, res) => {
  const { access_token } = req.body;
  if (!access_token) {
    return res.status(400).json({ message: "Token is required" });
  }
  // Set JWT token in HttpOnly cookie
  res.cookie("access_token", access_token, {
    httpOnly: true, // Can't be accessed using JavaScript
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000, // 60 minutes
  });
  res.status(200).json({ message: "Accesstoken set in HttpOnly cookie" });
});

// clear-cookie endpoint for Access Token (JWT)
router.post("/clear-cookie", (req, res) => {
  // Clear the 'access_token' cookie
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out and cookie cleared" });
});

export default router;
