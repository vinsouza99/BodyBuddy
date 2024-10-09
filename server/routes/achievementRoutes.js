import express from "express";
import {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Achievement:
 *       type: object
 *       required: none
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the Achievement
 *         name:
 *           type: string
 *           description: The achievement name
 *         description:
 *           type: string
 *           description: The description of the achievement
 */

/**
 * @swagger
 * /Achievements:
 *   get:
 *     summary: Returns a list of all Achievements
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
router.get("/", getAchievements);

/**
 * @swagger
 * /Achievements/{id}:
 *   get:
 *     summary: Get a specific Achievement by ID
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Achievement
 *     responses:
 *       200:
 *         description: The Achievement details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Achievement'
 *       404:
 *         description: Achievement not found
 */
router.get("/:id", getAchievement);

/**
 * @swagger
 * /Achievements:
 *   post:
 *     summary: Create a new Achievement
 *     tags: [Achievements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Achievement'
 *     responses:
 *       201:
 *         description: The Achievement was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Achievement'
 *       500:
 *         description: Server error
 */
router.post("/", createAchievement);

/**
 * @swagger
 * /Achievements/{id}:
 *   put:
 *     summary: Update an existing Achievement by ID
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Achievement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Achievement'
 *     responses:
 *       200:
 *         description: The Achievement was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Achievement'
 *       404:
 *         description: Achievement not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateAchievement);

/**
 * @swagger
 * /Achievements/{id}:
 *   delete:
 *     summary: Delete an Achievement by ID
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Achievement
 *     responses:
 *       200:
 *         description: Achievement was successfully deleted
 *       404:
 *         description: Achievement not found
 */
router.delete("/:id", deleteAchievement);

export default router;
