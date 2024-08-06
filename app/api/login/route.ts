import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '../../utils/postgres';

const SECRET_KEY = 'your_jwt_secret';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const client = await pool.connect();
    const query = `
      SELECT * FROM credentials
      WHERE email = $1
    `;

    const result = await client.query(query, [username]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Invalid username or email' }, { status: 401 });
    }

    const user = result.rows[0];
    const isPasswordValid = (password === user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }
    const payload = {
      userId: user.id,
      email: username,
      role: 'user',
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
