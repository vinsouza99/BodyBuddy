import express from "express";
import {
  getRoutines,
  getPresetRoutines,
  getRoutinesByProgram,
  getRoutine,
  createRoutine,
  updateRoutine,
  deleteRoutine,
  createRoutineExercise,
  getRoutineExercises,
  updateRoutineExercise,
  getUserRoutineHistory,
  createRoutineHistory,
} from "../controllers/routineController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Routine:
 *       type: object
 *       required: none
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the Routine
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the Routine was created
 *         program_id:
 *           type: string
 *           description: The program that has this routine
 *         duration:
 *           type: integer
 *           description: The duration of the routine in milliseconds
 *         name:
 *           type: string
 *           description: The name of the routine
 */

/**
 * @swagger
 * /Routines:
 *   get:
 *     summary: Returns a list of all Routines
 *     tags: [Routines]
 *     responses:
 *       200:
 *         description: A list of Routines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Routine'
 */
router.get("/", getRoutines);

/**
 * @swagger
 * /Routines/presets:
 *   get:
 *     summary: Get all preset routines
 *     tags: [Routines]
 *     responses:
 *       200:
 *         description: The Routine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       404:
 *         description: Routine not found
 */
router.get("/presets", getPresetRoutines);

/**
 * @swagger
 * /Routines/program/{program_id}:
 *   get:
 *     summary: Get routines of a program
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: program_id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the program
 *     responses:
 *       200:
 *         description: The Routine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       404:
 *         description: Routine not found
 */
router.get("/program/:program_id", getRoutinesByProgram);

/**
 * @swagger
 * /Routines/{id}:
 *   get:
 *     summary: Get a specific Routine by ID
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Routine
 *     responses:
 *       200:
 *         description: The Routine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       404:
 *         description: Routine not found
 */
router.get("/:id", getRoutine);

/**
 * @swagger
 * /Routines/{id}:
 *   get:
 *     summary: Get a specific Routine by ID
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Routine
 *     responses:
 *       200:
 *         description: The Routine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       404:
 *         description: Routine not found
 */
router.get("/exercises/:routine_id", getRoutineExercises);

/**
 * @swagger
 * /Routines/History/{user_id}:
 *   get:
 *     summary: Get a specific Routine history by user ID
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The Routine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       404:
 *         description: Routine not found
 */
router.get("/history/:user_id", getUserRoutineHistory);

/**
 * @swagger
 * /Routines:
 *   post:
 *     summary: Create a new Routine
 *     tags: [Routines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Routine'
 *     responses:
 *       201:
 *         description: The Routine was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       500:
 *         description: Server error
 */
router.post("/", createRoutine);
/**
 * @swagger
 * /Routines/Exercise:
 *   post:
 *     summary: Create a new Routine
 *     tags: [Routines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Routine'
 *     responses:
 *       201:
 *         description: The Routine was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       500:
 *         description: Server error
 */
router.post("/exercises", createRoutineExercise);

/**
 * @swagger
 * /Routines/{id}:
 *   put:
 *     summary: Update an existing Routine by ID
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Routine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Routine'
 *     responses:
 *       200:
 *         description: The Routine was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Routine'
 *       404:
 *         description: Routine not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateRoutine);

/**
 * @swagger
 * /Routines/Exercise/{id}:
 *   post:
 *     summary: Create a new Routine Exercise
 *     tags: [RoutineExercises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoutineExercise'
 *     responses:
 *       201:
 *         description: The Routine Exercise was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoutineExercise'
 *       500:
 *         description: Server error
 */
router.put("/exercise/:id", updateRoutineExercise);

/**
 * @swagger
 * /Routines/{id}:
 *   delete:
 *     summary: Delete an Routine by ID
 *     tags: [Routines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Routine
 *     responses:
 *       200:
 *         description: Routine was successfully deleted
 *       404:
 *         description: Routine not found
 */
router.delete("/:id", deleteRoutine);

/**
 * @swagger
 * /routine-history:
 *   post:
 *     summary: Create a new routine history
 *     tags:
 *       - Routine History
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "12345"
 *               completed_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-22T14:30:00Z"
 *               routine_id:
 *                 type: string
 *                 example: "67890"
 *               recording_URL:
 *                 type: string
 *                 example: "https://example.com/recording.mp4"
 *               score:
 *                 type: number
 *                 example: 85
 *               calories:
 *                 type: number
 *                 example: 250
 *     responses:
 *       201:
 *         description: Routine History created
 *       500:
 *         description: Internal Server Error
 */
router.post("/history", createRoutineHistory);

export default router;
