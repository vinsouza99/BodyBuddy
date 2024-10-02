import express from "express";
import {
  getLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog,
} from "../controllers/historyController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required: none
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the Log
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the Log was created
 *         program_id:
 *           type: string
 *           format: uuid
 *           description: The program that has this program
 *         routine_id:
 *           type: string
 *           format: uuid
 *           description: The program that has this program
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The program that has this program
 *         description:
 *           type: string
 *           description: The duration of the program in milliseconds
 *         recording_url:
 *          type: string
 *          description: The recording url of the session
 */

/**
 * @swagger
 * /Log:
 *   get:
 *     summary: Returns a list of all Logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: A list of Logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */
router.get("/", getLogs);

/**
 * @swagger
 * /Log/{id}:
 *   get:
 *     summary: Get a specific Log by ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Log
 *     responses:
 *       200:
 *         description: The Log details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       404:
 *         description: Log not found
 */
router.get("/:id", getLog);

/**
 * @swagger
 * /Log:
 *   post:
 *     summary: Create a new Log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       201:
 *         description: The Log was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       500:
 *         description: Server error
 */
router.post("/", createLog);

/**
 * @swagger
 * /Log/{id}:
 *   put:
 *     summary: Update an existing Log by ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Log'
 *     responses:
 *       200:
 *         description: The Log was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       404:
 *         description: Log not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateLog);

/**
 * @swagger
 * /Log/{id}:
 *   delete:
 *     summary: Delete an Log by ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Log
 *     responses:
 *       200:
 *         description: Log was successfully deleted
 *       404:
 *         description: Log not found
 */
router.delete("/:id", deleteLog);

export default router;
