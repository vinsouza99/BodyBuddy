import express from "express";
import {
  getPrograms,
  getProgramsByUser,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
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
