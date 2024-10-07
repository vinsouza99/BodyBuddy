import express from "express";
import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";

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
router.get("/", getGoals);

/**
 * @swagger
 * /Goals/{id}:
 *   get:
 *     summary: Get a specific Goal by ID
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the Goal
 *     responses:
 *       200:
 *         description: The Goal details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       404:
 *         description: Goal not found
 */
router.get("/:id", getGoal);

/**
 * @swagger
 * /Goals:
 *   post:
 *     summary: Create a new Goal
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       201:
 *         description: The Goal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       500:
 *         description: Server error
 */
router.post("/", createGoal);

/**
 * @swagger
 * /Goals/{id}:
 *   put:
 *     summary: Update an existing Goal by ID
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: UUID
 *         required: true
 *         description: The ID of the Goal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: The Goal was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateGoal);

/**
 * @swagger
 * /Goals/{id}:
 *   delete:
 *     summary: Delete an Goal by ID
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Goal
 *     responses:
 *       200:
 *         description: Goal was successfully deleted
 *       404:
 *         description: Goal not found
 */
router.delete("/:id", deleteGoal);

export default router;
