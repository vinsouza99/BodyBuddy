import express from "express";
import {
  getGoals,
  getGoal,
  getIntensities,
  getIntensity,
  getAchievements,
  getMuscleGroup,
  getMuscleGroups,
  getTypes,
  getType,
} from "../controllers/localTablesController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Goal:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the Goal
 *         name:
 *           type: string
 *           description: The name of the Goal
 *         description:
 *           type: string
 *           description: The description of the Goal
 */

/**
 * @swagger
 * /Goals:
 *   get:
 *     summary: Returns a list of all Goals
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: A list of Goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 */
router.get("/goals", getGoals);
/**
 * @swagger
 * /Goals:
 *   get:
 *     summary: Returns a list of all Goals
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: A list of Goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 */
router.get("/goals/:goal_id", getGoal);

/**
 * @swagger
 * /Goals:
 *   get:
 *     summary: Returns a list of all Goals
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: A list of Goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 */
router.get("/intensity", getIntensities);
/**
 * @swagger
 * /Goals:
 *   get:
 *     summary: Returns a list of all Goals
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: A list of Goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 */
router.get("/intensity/:intensity_id", getIntensity);

/**
 * @swagger
 * /Local/Achievements:
 *   get:
 *     summary: Returns a list of all achievements
 *     tags: [Achievements]
 *     responses:
 *       200:
 *         description: A list of Achievements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Achievement'
 */
router.get("/achievements", getAchievements);

/**
 * @swagger
 * /Goals:
 *   get:
 *     summary: Returns a list of all Goals
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: A list of Goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 */
router.get("/muscleGroups", getMuscleGroups);
/**
 * @swagger
 * /Goals:
 *   get:
 *     summary: Returns a list of all Goals
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: A list of Goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 */
router.get("/muscleGroups/:muscle_group_id", getMuscleGroup);

/**
 * @swagger
 * /Types:
 *   get:
 *     summary: Returns a list of types
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: A list of types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 */
router.get("/types", getTypes);
/**
 * @swagger
 * /Types/{id}:
 *   get:
 *     summary: Returns the type by ID
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: A exercise type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 */
router.get("/types/:type_id", getType);
export default router;
