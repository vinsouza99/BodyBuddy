import express from "express";
import {
  getMuscleGroups,
  getMuscleGroup,
  createMuscleGroup,
  updateMuscleGroup,
  deleteMuscleGroup,
} from "../controllers/muscleGroupController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MuscleGroup:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the MuscleGroup
 *         name:
 *           type: string
 *           description: The name of the MuscleGroup
 *         description:
 *           type: string
 *           description: The description of the MuscleGroup
 */

/**
 * @swagger
 * /MuscleGroups:
 *   get:
 *     summary: Returns a list of all MuscleGroups
 *     tags: [MuscleGroups]
 *     responses:
 *       200:
 *         description: A list of MuscleGroups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MuscleGroup'
 */
router.get("/", getMuscleGroups);

/**
 * @swagger
 * /MuscleGroups/{id}:
 *   get:
 *     summary: Get a specific MuscleGroup by ID
 *     tags: [MuscleGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the MuscleGroup
 *     responses:
 *       200:
 *         description: The MuscleGroup details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MuscleGroup'
 *       404:
 *         description: MuscleGroup not found
 */
router.get("/:id", getMuscleGroup);

/**
 * @swagger
 * /MuscleGroups:
 *   post:
 *     summary: Create a new MuscleGroup
 *     tags: [MuscleGroups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MuscleGroup'
 *     responses:
 *       201:
 *         description: The MuscleGroup was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MuscleGroup'
 *       500:
 *         description: Server error
 */
router.post("/", createMuscleGroup);

/**
 * @swagger
 * /MuscleGroups/{id}:
 *   put:
 *     summary: Update an existing MuscleGroup by ID
 *     tags: [MuscleGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: UUID
 *         required: true
 *         description: The ID of the MuscleGroup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MuscleGroup'
 *     responses:
 *       200:
 *         description: The MuscleGroup was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MuscleGroup'
 *       404:
 *         description: MuscleGroup not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateMuscleGroup);

/**
 * @swagger
 * /MuscleGroups/{id}:
 *   delete:
 *     summary: Delete an MuscleGroup by ID
 *     tags: [MuscleGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the MuscleGroup
 *     responses:
 *       200:
 *         description: MuscleGroup was successfully deleted
 *       404:
 *         description: MuscleGroup not found
 */
router.delete("/:id", deleteMuscleGroup);

export default router;
