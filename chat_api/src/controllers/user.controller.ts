import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Op } from 'sequelize';

export const listAllUsers = async (req: Request, res: Response) => {
    try {
        const requesterId = (req as any).user?.userId;
        const users = await User.findAll({
            attributes: ['user_id', 'email', 'first_name', 'last_name'],
            where: { user_id: {
                [Op.not]: requesterId
            } },
        });
        res.json({ users });
    } catch (error: any) {
        res.status(400).json({ error_code: 105, error_title: 'User Retrieval Error', error_message: error.message });
    }
};
