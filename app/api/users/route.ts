import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/postgres';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session || !session.user || !session.user.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const email = session.user.email;
    const client = await pool.connect();
    console.log('Connected to the database!');

    const query = `
      SELECT 
        c.username AS name,
        c.address,
        c.height,
        c.weight,
        c.blood_group,
        EXTRACT(YEAR FROM AGE(c.date_of_birth)) AS age,
        hd.calories_burnt,
        hd.steps,
        hd.water_intake
      FROM 
        consumer c
      LEFT JOIN 
        health_data hd
      ON 
        c.consumer_id = hd.consumer_id
      WHERE 
        c.email = $1
    `;

    const result = await client.query(query, [email]);
    client.release();

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
