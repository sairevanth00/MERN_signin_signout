import express from 'express';
import auth from '../middleware/jwtMiddleware.js';
import { getUserDetails, updatePassword } from '../controllers/userController.js';
const router = express.Router();

router.get('/me', auth, getUserDetails);

router.put('/update-password', auth, updatePassword);

export default router;
