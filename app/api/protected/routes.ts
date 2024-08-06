import { NextApiRequest, NextApiResponse } from 'next';
// import { authMiddleware } from '../../../utils/authMiddleware'; // Adjust the import path as necessary
import { authMiddleware } from '@/app/utils/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'This is a protected route' });
};

export default authMiddleware(handler);
