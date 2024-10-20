import express from "express";
/*
import {
  getUserGoal,
  getUserGoals,
  createUserGoal,
  deleteUserGoal,
} from "../controllers/userGoalController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserGoal:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the UserGoal
 *         user_id:
 *           type: integer
 *           description: The ID of the user
 *         goal_id:
 *           type: integer
 *           description: The ID of the goal
 *
 */

/**
 * @swagger
 * /UserGoals/{id}:
 *   get:
 *     summary: Get a specific UserGoal by ID
 *     tags: [UserGoals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the UserGoal
 *     responses:
 *       200:
 *         description: The UserGoal details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGoal'
 *       404:
 *         description: UserGoal not found
 */
router.get("/:id", getUserGoals);

/**
 * @swagger
 * /UserGoals/{id}:
 *   get:
 *     summary: Get a specific UserGoal by ID
 *     tags: [UserGoals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the UserGoal
 *     responses:
 *       200:
 *         description: The UserGoal details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGoal'
 *       404:
 *         description: UserGoal not found
 */
router.get("/", getUserGoal);
/**
 * @swagger
 * /UserGoals:
 *   post:
 *     summary: Create a new UserGoal
 *     tags: [UserGoals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserGoal'
 *     responses:
 *       201:
 *         description: The UserGoal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGoal'
 *       500:
 *         description: Server error
 */
router.post("/", createUserGoal);

/**
 * @swagger
 * /UserGoals/{id}:
 *   delete:
 *     summary: Delete an UserGoal by ID
 *     tags: [UserGoals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the UserGoal
 *     responses:
 *       200:
 *         description: UserGoal was successfully deleted
 *       404:
 *         description: UserGoal not found
 */
router.delete("/:id", deleteUserGoal);

export default router;
