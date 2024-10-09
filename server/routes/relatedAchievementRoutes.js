import express from "express";
import {
  getRelatedAchievements,
  getRelatedAchievement,
  createRelatedAchievement,
  updateRelatedAchievement,
  deleteRelatedAchievement,
} from "../controllers/relatedAchievementController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RelatedAchievement:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the RelatedAchievement
 *         user_id:
 *           type: integer
 *           description: The ID of the user
 *         achievement_id:
 *           type: integer
 *           description: The ID of the user achievement
 *         earned_at:
 *           type: date
 *           description: The date the achievement was earned
 */

/**
 * @swagger
 * /RelatedAchievements:
 *   get:
 *     summary: Returns a list of all RelatedAchievements
 *     tags: [RelatedAchievements]
 *     responses:
 *       200:
 *         description: A list of RelatedAchievements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelatedAchievement'
 */
router.get("/", getRelatedAchievements);

/**
 * @swagger
 * /RelatedAchievements/{id}:
 *   get:
 *     summary: Get a specific RelatedAchievement by ID
 *     tags: [RelatedAchievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the RelatedAchievement
 *     responses:
 *       200:
 *         description: The RelatedAchievement details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedAchievement'
 *       404:
 *         description: RelatedAchievement not found
 */
router.get("/:id", getRelatedAchievement);

/**
 * @swagger
 * /RelatedAchievements:
 *   post:
 *     summary: Create a new RelatedAchievement
 *     tags: [RelatedAchievements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RelatedAchievement'
 *     responses:
 *       201:
 *         description: The RelatedAchievement was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedAchievement'
 *       500:
 *         description: Server error
 */
router.post("/", createRelatedAchievement);

/**
 * @swagger
 * /RelatedAchievements/{id}:
 *   put:
 *     summary: Update an existing RelatedAchievement by ID
 *     tags: [RelatedAchievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: UUID
 *         required: true
 *         description: The ID of the RelatedAchievement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RelatedAchievement'
 *     responses:
 *       200:
 *         description: The RelatedAchievement was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedAchievement'
 *       404:
 *         description: RelatedAchievement not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateRelatedAchievement);

/**
 * @swagger
 * /RelatedAchievements/{id}:
 *   delete:
 *     summary: Delete an RelatedAchievement by ID
 *     tags: [RelatedAchievements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the RelatedAchievement
 *     responses:
 *       200:
 *         description: RelatedAchievement was successfully deleted
 *       404:
 *         description: RelatedAchievement not found
 */
router.delete("/:id", deleteRelatedAchievement);

export default router;
