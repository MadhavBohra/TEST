import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export function authMiddleware(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      jwt.verify(token, SECRET_KEY);
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
