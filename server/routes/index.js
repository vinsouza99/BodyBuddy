import express from 'express';
import accountRoutes from './accountRoutes.js';

const router = express.Router();

// For Account
router.use('/accounts', accountRoutes);
// For other routes
// router.use('/other', otherRoutes);

export default router;