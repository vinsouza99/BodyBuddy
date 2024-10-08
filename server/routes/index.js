import express from "express";
import userRoutes from "./userRoutes.js";
import programRoutes from "./programRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import routineExerciseRoutes from "./routineExerciseRoutes.js";
import routineRoutes from "./routineRoutes.js";
import historyRoutes from "./historyRoutes.js";
import openaiapiRoutes from "./openaiapiRoutes.js";
const router = express.Router();

router.use("/users", userRoutes);
router.use("/programs", programRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/routines", routineRoutes);
router.use("/routineExercises", routineExerciseRoutes);
router.use("/log", historyRoutes);
router.use("/openai", openaiapiRoutes);

export default router;
