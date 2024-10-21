import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserSettings,
  updateUserSettings,
  getUserProgress,
  updateUserProgress,
  getUserSchedule,
  createUserSchedule,
  updateUserSchedule,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password_hash
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the User
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the User was created
 *         username:
 *           type: string
 *           description: The username of the User
 *         email:
 *           type: string
 *           description: The email of the User
 *         password_hash:
 *           type: string
 *           description: The hashed password of the User
 *         first_name:
 *           type: string
 *           description: The first name of the User holder
 *         last_name:
 *           type: string
 *           description: The last name of the User holder
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: The date of birth of the User holder
 *         phone_number:
 *           type: string
 *           description: The phone number of the User holder
 *         last_login:
 *           type: string
 *           format: date-time
 *           description: The last login timestamp
 *         is_active:
 *           type: boolean
 *           description: Whether the User is active
 *         profile_image_url:
 *           type: string
 *           description: The profile image URL of the User holder
 */

/**
 * @swagger
 * /Users:
 *   get:
 *     summary: Returns a list of all Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", getUsers);

/**
 * @swagger
 * /Users/{id}:
 *   get:
 *     summary: Get a specific User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: The User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /Users:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.post("/", createUser);

/**
 * @swagger
 * /Users/{id}:
 *   put:
 *     summary: Update an existing User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: UUID
 *         required: true
 *         description: The ID of the User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /Users/{id}:
 *   delete:
 *     summary: Delete an User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: User was successfully deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /Users/{id}/Progress:
 *   get:
 *     summary: Get a specific user goal by User ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: The user goal details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/progress/:id", getUserProgress);

/**
 * @swagger
 * /Users/{id}/Progress:
 *   put:
 *     summary: Update the progress by User ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: The user progress
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put("/progress/:id", updateUserProgress);
/**
 * @swagger
 * /Users/{id}/Settings:
 *   get:
 *     summary: Get the settings by User ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: The user settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/settings/:id", getUserSettings);

/**
 * @swagger
 * /Users/{id}/Settings:
 *   put:
 *     summary: Update the settings by User ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: The user settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put("/settings/:id", updateUserSettings);

/**
 * @swagger
 * /Users/{id}/Settings:
 *   get:
 *     summary: Get the settings by User ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: The user settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/schedule/:id", getUserSchedule);

/**
 * @swagger
 * /Users/{id}/Settings:
 *   put:
 *     summary: Update the settings by User ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: The user settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put("/schedule/:id", updateUserSchedule);

/**
 * @swagger
 * /Users/{id}/Settings:
 *   put:
 *     summary: Update the settings by User ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the User
 *     responses:
 *       200:
 *         description: The user settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.post("/schedule/:id", createUserSchedule);
export default router;
