import express from "express";
import {
  getRelatedMuscleGroups,
  getRelatedMuscleGroup,
  createRelatedMuscleGroup,
  updateRelatedMuscleGroup,
  deleteRelatedMuscleGroup,
} from "../controllers/relatedMuscleGroupController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RelatedMuscleGroup:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the RelatedMuscleGroup
 *         name:
 *           type: string
 *           description: The name of the RelatedMuscleGroup
 *         description:
 *           type: string
 *           description: The description of the RelatedMuscleGroup
 */

/**
 * @swagger
 * /RelatedMuscleGroups:
 *   get:
 *     summary: Returns a list of all RelatedMuscleGroups
 *     tags: [RelatedMuscleGroups]
 *     responses:
 *       200:
 *         description: A list of RelatedMuscleGroups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RelatedMuscleGroup'
 */
router.get("/", getRelatedMuscleGroups);

/**
 * @swagger
 * /RelatedMuscleGroups/{id}:
 *   get:
 *     summary: Get a specific RelatedMuscleGroup by ID
 *     tags: [RelatedMuscleGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the RelatedMuscleGroup
 *     responses:
 *       200:
 *         description: The RelatedMuscleGroup details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedMuscleGroup'
 *       404:
 *         description: RelatedMuscleGroup not found
 */
router.get("/:id", getRelatedMuscleGroup);

/**
 * @swagger
 * /RelatedMuscleGroups:
 *   post:
 *     summary: Create a new RelatedMuscleGroup
 *     tags: [RelatedMuscleGroups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RelatedMuscleGroup'
 *     responses:
 *       201:
 *         description: The RelatedMuscleGroup was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedMuscleGroup'
 *       500:
 *         description: Server error
 */
router.post("/", createRelatedMuscleGroup);

/**
 * @swagger
 * /RelatedMuscleGroups/{id}:
 *   put:
 *     summary: Update an existing RelatedMuscleGroup by ID
 *     tags: [RelatedMuscleGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: UUID
 *         required: true
 *         description: The ID of the RelatedMuscleGroup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RelatedMuscleGroup'
 *     responses:
 *       200:
 *         description: The RelatedMuscleGroup was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatedMuscleGroup'
 *       404:
 *         description: RelatedMuscleGroup not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateRelatedMuscleGroup);

/**
 * @swagger
 * /RelatedMuscleGroups/{id}:
 *   delete:
 *     summary: Delete an RelatedMuscleGroup by ID
 *     tags: [RelatedMuscleGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the RelatedMuscleGroup
 *     responses:
 *       200:
 *         description: RelatedMuscleGroup was successfully deleted
 *       404:
 *         description: RelatedMuscleGroup not found
 */
router.delete("/:id", deleteRelatedMuscleGroup);

export default router;
