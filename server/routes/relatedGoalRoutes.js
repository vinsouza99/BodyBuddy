import express from "express";
import {
  getRelatedGoals,
  getRelatedGoal,
  createRelatedGoal,
  updateRelatedGoal,
  deleteRelatedGoal,
} from "../controllers/relatedGoalController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RelatedGoal:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the RelatedGoal
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
 * /RelatedGoals:
 *   get:
 *     summary: Returns a list of all RelatedGoals
 *     tags: [RelatedGoals]
 *     responses:
 *       200:
 *         description: A list of RelatedGoals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelatedGoal'
 */
router.get("/", getRelatedGoals);

/**
 * @swagger
 * /RelatedGoals/{id}:
 *   get:
 *     summary: Get a specific RelatedGoal by ID
 *     tags: [RelatedGoals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the RelatedGoal
 *     responses:
 *       200:
 *         description: The RelatedGoal details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedGoal'
 *       404:
 *         description: RelatedGoal not found
 */
router.get("/:id", getRelatedGoal);

/**
 * @swagger
 * /RelatedGoals:
 *   post:
 *     summary: Create a new RelatedGoal
 *     tags: [RelatedGoals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RelatedGoal'
 *     responses:
 *       201:
 *         description: The RelatedGoal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedGoal'
 *       500:
 *         description: Server error
 */
router.post("/", createRelatedGoal);

/**
 * @swagger
 * /RelatedGoals/{id}:
 *   put:
 *     summary: Update an existing RelatedGoal by ID
 *     tags: [RelatedGoals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: UUID
 *         required: true
 *         description: The ID of the RelatedGoal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RelatedGoal'
 *     responses:
 *       200:
 *         description: The RelatedGoal was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedGoal'
 *       404:
 *         description: RelatedGoal not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateRelatedGoal);

/**
 * @swagger
 * /RelatedGoals/{id}:
 *   delete:
 *     summary: Delete an RelatedGoal by ID
 *     tags: [RelatedGoals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the RelatedGoal
 *     responses:
 *       200:
 *         description: RelatedGoal was successfully deleted
 *       404:
 *         description: RelatedGoal not found
 */
router.delete("/:id", deleteRelatedGoal);

export default router;
