import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, 'your_secret_key', (err: any, user: any) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     next();
//   });
// };
