import { Request, Response } from 'express';

export const checkAppHealth = async (req: Request, res: Response) => {
    return res.status(201).json({ message: 'Server is running' });
};