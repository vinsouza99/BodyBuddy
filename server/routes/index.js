import express from "express";
import userRoutes from "./userRoutes.js";
import programRoutes from "./programRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import routineExerciseRoutes from "./routineExerciseRoutes.js";
import routineRoutes from "./routineRoutes.js";
import historyRoutes from "./historyRoutes.js";
import goalRoutes from "./goalRoutes.js";
import relatedGoalRoutes from "./relatedGoalRoutes.js";
import achievementRoutes from "./achievementRoutes.js";
import relatedAchievementRoutes from "./relatedAchievementRoutes.js";
import muscleGroupRoutes from "./relatedMuscleGroupRoutes.js";
import relatedMuscleGroupRoutes from "./relatedMuscleGroupRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/programs", programRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/routines", routineRoutes);
router.use("/routineExercises", routineExerciseRoutes);
router.use("/log", historyRoutes);
router.use("/goals", goalRoutes);
router.use("/relatedGoals", relatedGoalRoutes);
router.use("/achievements", achievementRoutes);
router.use("/relatedAchievements", relatedAchievementRoutes);
router.use("/muscleGroups", muscleGroupRoutes);
router.use("/relatedMuscleGroups", relatedMuscleGroupRoutes);

export default router;
