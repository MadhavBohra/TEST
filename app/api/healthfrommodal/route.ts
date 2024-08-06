import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/utils/postgres';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to use an environment variable in production

function decodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as jwt.JwtPayload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { steps, caloriesBurnt, waterIntake, token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = decodeToken(token);

    if (!decoded || !decoded.email) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const userEmail = decoded.email;

    console.log("User's email:", userEmail);
    const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    console.log('Processing health data for user:', userEmail);
    console.log('Date:', date, 'Steps:', steps, 'Calories Burnt:', caloriesBurnt, 'Water Intake:', waterIntake);

    const client = await pool.connect();

    // Check if a row with the given email and today's date exists
    const checkQuery = `
      SELECT * FROM health WHERE email = $1 AND date = $2
    `;
    const checkResult = await client.query(checkQuery, [userEmail, date]);

    console.log('Check query result:', checkResult.rows);

    if (checkResult.rows.length > 0) {
      // Update the existing row
      const updateQuery = `
        UPDATE health
        SET steps = $1, calories = $2, water = $3
        WHERE email = $4 AND date = $5
      `;
      const updateResult = await client.query(updateQuery, [steps, caloriesBurnt, waterIntake, userEmail, date]);
      console.log('Update result:', updateResult.rowCount);
    } else {
      // Insert a new row
      const insertQuery = `
        INSERT INTO health (email, date, steps, calories, water)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const insertResult = await client.query(insertQuery, [userEmail, date, steps, caloriesBurnt, waterIntake]);
      console.log('Insert result:', insertResult.rowCount);
    }

    client.release();

    return NextResponse.json({ message: 'Record processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error during processing:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}