import express from "express";
import { getResponse } from "../controllers/openaiController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     OpenAI API:
 *       type: object
 *       required: none
 *       properties:
 *         prompt:
 *           type: string
 *           description: The prompt for chatGPT
 */

/**
 * @swagger
 * /OpenAI API Response:
 *   post:
 *     summary: Returns an object containing the response from ChatGPT
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: An object containing the response from ChatGPT
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.post("/", getResponse);

export default router;
