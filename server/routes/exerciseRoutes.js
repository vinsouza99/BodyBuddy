import express from "express";
import {
  getExercises,
  getExercisesCount,
  getExercise,
  getExerciseTypes,
  getExerciseGoals,
  getExerciseMuscleGroups,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required: none
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the Exercise
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the Exercise was created
 *         name:
 *           type: string
 *           description: The exercise name
 *         description:
 *           type: string
 *           description: The description of the exercise
 *         demo_url:
 *           type: string
 *           description: The url of the exercise demo
 */
/**
 * @swagger
 * /Exercises:
 *   get:
 *     summary: Returns a list of all Exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: A list of Exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
router.get("/", getExercises);

/**
 * @swagger
 * /Exercises:
 *   get:
 *     summary: Returns a list of all Exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: A list of Exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
router.get("/count", getExercisesCount);
/**
 * @swagger
 * /Exercises:
 *   get:
 *     summary: Returns a list of all Exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: A list of Exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
router.get("/offset=:offset_num&limit=:limit_num", getExercises);

/**
 * @swagger
 * /Exercises/{id}:
 *   get:
 *     summary: Get a specific Exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the Exercise
 *     responses:
 *       200:
 *         description: The Exercise details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 */
router.get("/:id", getExercise);
/**
 * @swagger
 * /Exercises/{id}:
 *   get:
 *     summary: Get a specific Exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the Exercise
 *     responses:
 *       200:
 *         description: The Exercise details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 */
router.get("/types/:id", getExerciseTypes);
/**
 * @swagger
 * /Exercises/{id}:
 *   get:
 *     summary: Get a specific Exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the Exercise
 *     responses:
 *       200:
 *         description: The Exercise details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 */
router.get("/goals/:id", getExerciseGoals);
/**
 * @swagger
 * /Exercises/{id}:
 *   get:
 *     summary: Get a specific Exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the Exercise
 *     responses:
 *       200:
 *         description: The Exercise details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 */
router.get("/muscleGroups/:id", getExerciseMuscleGroups);
/**
 * @swagger
 * /Exercises:
 *   post:
 *     summary: Create a new Exercise
 *     tags: [Exercises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       201:
 *         description: The Exercise was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       500:
 *         description: Server error
 */
router.post("/", createExercise);

/**
 * @swagger
 * /Exercises/{id}:
 *   put:
 *     summary: Update an existing Exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Exercise
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exercise'
 *     responses:
 *       200:
 *         description: The Exercise was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateExercise);

/**
 * @swagger
 * /Exercises/{id}:
 *   delete:
 *     summary: Delete an Exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Exercise
 *     responses:
 *       200:
 *         description: Exercise was successfully deleted
 *       404:
 *         description: Exercise not found
 */
router.delete("/:id", deleteExercise);

export default router;
