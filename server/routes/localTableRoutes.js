import express from "express";
import {
  getGoals,
  getGoal,
  getIntensities,
  getIntensity,
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
router.get("/goals/:goal_id", getGoals);

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

export default router;
