import express from "express";
import {
  getUserSettings,
  createUserSettings,
  updateUserSettings,
  deleteUserSettings,
} from "../controllers/userSettingsController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSettings:
 *       type: object
 *       required:
 *         - user_id
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated ID of the User
 */

/**
 * @swagger
 * /UserSettingss/{id}:
 *   get:
 *     summary: Get a specific UserSettings by ID
 *     tags: [UserSettingss]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the UserSettings
 *     responses:
 *       200:
 *         description: The UserSettings details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettings'
 *       404:
 *         description: UserSettings not found
 */
router.get("/:id", getUserSettings);

/**
 * @swagger
 * /UserSettingss:
 *   post:
 *     summary: Create a new UserSettings
 *     tags: [UserSettingss]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSettings'
 *     responses:
 *       201:
 *         description: The UserSettings was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettings'
 *       500:
 *         description: Server error
 */
router.post("/", createUserSettings);

/**
 * @swagger
 * /UserSettingss/{id}:
 *   put:
 *     summary: Update an existing UserSettings by ID
 *     tags: [UserSettingss]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: UUID
 *         required: true
 *         description: The ID of the UserSettings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSettings'
 *     responses:
 *       200:
 *         description: The UserSettings was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettings'
 *       404:
 *         description: UserSettings not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateUserSettings);

/**
 * @swagger
 * /UserSettingss/{id}:
 *   delete:
 *     summary: Delete an UserSettings by ID
 *     tags: [UserSettingss]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the UserSettings
 *     responses:
 *       200:
 *         description: UserSettings was successfully deleted
 *       404:
 *         description: UserSettings not found
 */
router.delete("/:id", deleteUserSettings);

export default router;
