import express from "express";
import userRoutes from "./userRoutes.js";
import localTableRoutes from "./localTableRoutes.js";
import programRoutes from "./programRoutes.js";
import exerciseRoutes from "./exerciseRoutes.js";
import routineRoutes from "./routineRoutes.js";
import authenticateToken from "../authenticateToken.js";
import openaiapiRoutes from "./openaiapiRoutes.js";

const router = express.Router();

router.use("/users", authenticateToken, userRoutes);
router.use("/local", localTableRoutes); // No authentication required
router.use("/programs", authenticateToken, programRoutes);
router.use("/exercises", authenticateToken, exerciseRoutes);
router.use("/routines", authenticateToken, routineRoutes);
router.use("/openai", authenticateToken, openaiapiRoutes);

export default router;
