import { Request, Response } from 'express';
import { Message } from '../models/message.model';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { sender_user_id, receiver_user_id, message } = req.body;
        const currentTime = new Date();
        const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
        await Message.create({ sender_user_id, receiver_user_id, message, epoch: unixTimestamp, created_at: currentTime  });
        res.json({ success_code: '200', success_title: 'Message Sent', success_message: 'Message was sent successfully' });
    } catch (error: any) {
        res.status(400).json({ error_code: 103, error_title: 'Message Error', error_message: error.message });
    }
};

export const viewMessages = async (req: Request, res: Response) => {
    try {
        const { user_id_a, user_id_b } = req.body;
        const messages = await Message.findAll({
            where: {
                sender_user_id: [user_id_a, user_id_b],
                receiver_user_id: [user_id_a, user_id_b]
            },
            order: [['epoch', 'ASC']]
        });
        res.json({ messages });
    } catch (error: any) {
        res.status(400).json({ error_code: 104, error_title: 'Message Retrieval Error', error_message: error.message });
    }
};
