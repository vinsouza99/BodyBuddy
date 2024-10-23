import express from "express";
import { getResponse } from "../controllers/openaiController.js";

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
router.get("/", getResponse);

export default router;
