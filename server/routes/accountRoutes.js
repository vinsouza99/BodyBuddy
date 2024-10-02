import express from 'express';
import { getAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../controllers/accountController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password_hash
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the account
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the account was created
 *         username:
 *           type: string
 *           description: The username of the account
 *         email:
 *           type: string
 *           description: The email of the account
 *         password_hash:
 *           type: string
 *           description: The hashed password of the account
 *         first_name:
 *           type: string
 *           description: The first name of the account holder
 *         last_name:
 *           type: string
 *           description: The last name of the account holder
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: The date of birth of the account holder
 *         phone_number:
 *           type: string
 *           description: The phone number of the account holder
 *         last_login:
 *           type: string
 *           format: date-time
 *           description: The last login timestamp
 *         is_active:
 *           type: boolean
 *           description: Whether the account is active
 *         profile_image_url:
 *           type: string
 *           description: The profile image URL of the account holder
 */

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Returns a list of all accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: A list of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
router.get('/', getAccounts);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get a specific account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the account
 *     responses:
 *       200:
 *         description: The account details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 */
router.get('/:id', getAccount);

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: The account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       500:
 *         description: Server error
 */
router.post('/', createAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Update an existing account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: The account was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the account
 *     responses:
 *       200:
 *         description: Account was successfully deleted
 *       404:
 *         description: Account not found
 */
router.delete('/:id', deleteAccount);

export default router;
