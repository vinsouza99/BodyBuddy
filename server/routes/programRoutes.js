import express from "express";
import {
  getPrograms,
  getProgramsByUser,
  getProgramByRoutine,
  getCompletedProgramsByUser,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
  createProgramRoutine,
  updateProgramRoutine,
} from "../controllers/programController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Program:
 *       type: object
 *       required: none
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the Program
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the Program was created
 *         user_id:
 *           type: bigint
 *           description: The user that has this program
 *         completed_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the Program was completed
 */

/**
 * @swagger
 * /Programs:
 *   get:
 *     summary: Returns a list of all Programs
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: A list of Programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Program'
 */
router.get("/", getPrograms);

/**
 * @swagger
 * /Programs/user/{user_id}:
 *   get:
 *     summary: Get all programs that has a specific user ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The Program details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 */
router.get("/user/:user_id", getProgramsByUser);

/**
 * @swagger
 * /programs/{routine_id}:
 *   get:
 *     summary: Retrieve a program by routine ID
 *     description: Retrieves a single program based on the specified routine ID.
 *     tags:
 *       - Programs
 *     parameters:
 *       - in: path
 *         name: routine_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the routine associated with the program
 *     responses:
 *       200:
 *         description: Success - returns the program associated with the given routine ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "200"
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found - no program associated with the specified routine ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "404"
 *                 message:
 *                   type: string
 *                   example: "Program not found"
 *       500:
 *         description: Internal Server Error - an unexpected error occurred on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500"
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/routine/:routine_id", getProgramByRoutine);

/**
 * @swagger
 * /Programs/user/{user_id}:
 *   get:
 *     summary: Get all programs that has a specific user ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: The Program details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 */
router.get("/user/:user_id/completed", getCompletedProgramsByUser);
/**
 * @swagger
 * /Programs/{id}:
 *   get:
 *     summary: Get a specific Program by ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Program
 *     responses:
 *       200:
 *         description: The Program details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 */
router.get("/:id", getProgram);

/**
 * @swagger
 * /Programs:
 *   post:
 *     summary: Create a new Program
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       201:
 *         description: The Program was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       500:
 *         description: Server error
 */
router.post("/", createProgram);

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Create a new program and its associated routines
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       201:
 *         description: The program and its routines were successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 program:
 *                   $ref: '#/components/schemas/Program'
 *                 routines:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Routine'
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/routines", createProgramRoutine);

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Create a new program and its associated routines
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               program_id:
 *                 type: integer
 *                 description: ID of the program
 *               routine_id:
 *                 type: integer
 *                 description: ID of the routine
 *               scheduled_date:
 *                 type: string
 *                 format: date
 *                 description: Scheduled date of the routine
 *                 example: "2024-10-31"
 *               completed:
 *                 type: boolean
 *                 description: Completion status of the routine
 *                 example: true
 *             required:
 *               - routine_id
 *               - scheduled_date
 *               - completed
 *     responses:
 *       201:
 *         description: The program and its routines were successfully created
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */
router.put("/routines", updateProgramRoutine);

/**
 * @swagger
 * /Programs/{id}:
 *   put:
 *     summary: Update an existing Program by ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Program
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Program'
 *     responses:
 *       200:
 *         description: The Program was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Program'
 *       404:
 *         description: Program not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateProgram);

/**
 * @swagger
 * /Programs/{id}:
 *   delete:
 *     summary: Delete an Program by ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Program
 *     responses:
 *       200:
 *         description: Program was successfully deleted
 *       404:
 *         description: Program not found
 */
router.delete("/:id", deleteProgram);

export default router;
