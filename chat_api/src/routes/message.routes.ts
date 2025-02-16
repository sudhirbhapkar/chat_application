import express from 'express';
import { sendMessage, viewMessages } from '../controllers/message.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/send_message', authenticateToken, sendMessage);
router.get('/view_messages', authenticateToken, viewMessages);

export default router;
