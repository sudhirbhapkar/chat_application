import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Request, Response } from 'express';

const HASH_SALT_KEY = 10;

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, first_name, last_name } = req.body;

        if (!email || !password || !first_name || !last_name) {
            throw new Error('Missing required fields');
        }
        const hashedPassword = await bcrypt.hash(password, HASH_SALT_KEY);
        const user: any = await User.create({ email, password: hashedPassword, first_name, last_name, created_at: new Date() });
        res.json({ user_id: user.id, email, first_name, last_name });
    } catch (error: any) {
        res.status(400).json({ error_code: 100, error_title: 'Registration Error', error_message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user: any = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            res.status(401).json({ error_code: 101, error_title: 'Login Failure', error_message: 'Invalid email or password!' });
        } else {
            const token = jwt.sign({ userId: user.user_id }, 'secretkey', { expiresIn: '1h' });
            res.json({ user_id: user.id, email, first_name: user.first_name, last_name: user.last_name, token });
        }
    } catch (error: any) {
        res.status(400).json({ error_code: 102, error_title: 'Login Error', error_message: error.message });
    }
};
