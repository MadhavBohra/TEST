import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/postgres';
import multer from 'multer';
import { getSession } from 'next-auth/react';
import nextConnect from 'next-connect';

// Configure multer for file uploads
// types/next.d.ts

declare module 'next' {
  export interface NextApiRequest {
    file?: Express.Multer.File;
  }
}




const upload = multer({ dest: 'uploads/' });

// Middleware handler to use with nextConnect
const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

// Apply multer middleware
apiRoute.use(upload.single('profilePicture'));

// Define the POST handler for the route
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // Get session
  const session = await getSession({ req });

  // Check if session is valid and user has an email
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Extract email and file details
  const email = session.user.email;
  const profilePicture = req.file?.filename; // Optional chaining to handle cases where no file is uploaded

  if (!profilePicture) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const client = await pool.connect();
    const updateProfilePicQuery = `
      UPDATE consumer
      SET profile_picture = $1
      WHERE email = $2
    `;
    await client.query(updateProfilePicQuery, [profilePicture, email]);
    client.release();

    res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default apiRoute;
