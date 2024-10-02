import express from "express";
import {
  getHistorys,
  getHistory,
  createHistory,
  updateHistory,
  deleteHistory,
} from "../controllers/historyController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     History:
 *       type: object
 *       required: none
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the History
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the History was created
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
 * /History:
 *   get:
 *     summary: Returns a list of all Historys
 *     tags: [Historys]
 *     responses:
 *       200:
 *         description: A list of Historys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History'
 */
router.get("/", getHistorys);

/**
 * @swagger
 * /History/{id}:
 *   get:
 *     summary: Get a specific History by ID
 *     tags: [Historys]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the History
 *     responses:
 *       200:
 *         description: The History details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       404:
 *         description: History not found
 */
router.get("/:id", getHistory);

/**
 * @swagger
 * /History:
 *   post:
 *     summary: Create a new History
 *     tags: [Historys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History'
 *     responses:
 *       201:
 *         description: The History was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       500:
 *         description: Server error
 */
router.post("/", createHistory);

/**
 * @swagger
 * /History/{id}:
 *   put:
 *     summary: Update an existing History by ID
 *     tags: [Historys]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the History
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History'
 *     responses:
 *       200:
 *         description: The History was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       404:
 *         description: History not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateHistory);

/**
 * @swagger
 * /History/{id}:
 *   delete:
 *     summary: Delete an History by ID
 *     tags: [Historys]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the History
 *     responses:
 *       200:
 *         description: History was successfully deleted
 *       404:
 *         description: History not found
 */
router.delete("/:id", deleteHistory);

export default router;
