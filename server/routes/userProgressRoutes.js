import express from "express";
import {
  getUserProgress,
  createUserProgress,
  updateUserProgress,
  deleteUserProgress,
} from "../controllers/userProgressController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProgress:
 *       type: object
 *       required:
 *         - user_id
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated ID of the User
 */

/**
 * @swagger
 * /UserProgresss/{id}:
 *   get:
 *     summary: Get a specific UserProgress by ID
 *     tags: [UserProgresss]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the UserProgress
 *     responses:
 *       200:
 *         description: The UserProgress details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProgress'
 *       404:
 *         description: UserProgress not found
 */
router.get("/:id", getUserProgress);

/**
 * @swagger
 * /UserProgresss:
 *   post:
 *     summary: Create a new UserProgress
 *     tags: [UserProgresss]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProgress'
 *     responses:
 *       201:
 *         description: The UserProgress was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProgress'
 *       500:
 *         description: Server error
 */
router.post("/", createUserProgress);

/**
 * @swagger
 * /UserProgresss/{id}:
 *   put:
 *     summary: Update an existing UserProgress by ID
 *     tags: [UserProgresss]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: UUID
 *         required: true
 *         description: The ID of the UserProgress
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProgress'
 *     responses:
 *       200:
 *         description: The UserProgress was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProgress'
 *       404:
 *         description: UserProgress not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateUserProgress);

/**
 * @swagger
 * /UserProgresss/{id}:
 *   delete:
 *     summary: Delete an UserProgress by ID
 *     tags: [UserProgresss]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the UserProgress
 *     responses:
 *       200:
 *         description: UserProgress was successfully deleted
 *       404:
 *         description: UserProgress not found
 */
router.delete("/:id", deleteUserProgress);

export default router;
