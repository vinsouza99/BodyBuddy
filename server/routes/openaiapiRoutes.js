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
 * /openai:
 *   post:
 *     summary: Get a response from OpenAI's GPT model
 *     tags: 
 *       - OpenAI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The prompt or question to be sent to the GPT model.
 *                 example: "What do you think about our app, BodyBuddy?"
 *     responses:
 *       200:
 *         description: Successfully returns the response from OpenAI GPT model
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
 *                   type: object
 *                   description: The response data from the OpenAI model
 *                   example: {
 *                     "id": "chatcmpl-xxx",
 *                     "object": "chat.completion",
 *                     "choices": [
 *                       {
 *                         "message": {
 *                           "role": "assistant",
 *                           "content": "The capital of France is Paris."
 *                         }
 *                       }
 *                     ]
 *                   }
 *       500:
 *         description: Internal Server Error
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
router.post("/", getResponse);

export default router;
