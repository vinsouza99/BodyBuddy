import express from "express";
import {
  getRoutines,
  getPresetRoutines,
  getRoutinesByProgram,
  getRoutine,
  createRoutine,
  updateRoutine,
  deleteRoutine,
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

export default router;
