import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({
            error_code: 401,
            error_title: 'Unauthorized',
            error_message: 'Access denied. No token provided.'
        });
    } else {

        jwt.verify(token, 'secretkey', (err, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    error_code: 106,
                    error_title: 'Forbidden',
                    error_message: 'Invalid token'
                });
            }
            console.log(`decoded ${JSON.stringify(decoded)}`);
            req.user = decoded;
            next();
        });
    }
};
