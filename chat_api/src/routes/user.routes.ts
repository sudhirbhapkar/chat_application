import express from 'express';
import { listAllUsers } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/list_all_users', authenticateToken, listAllUsers);

export default router;
