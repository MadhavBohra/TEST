import { NextRequest, NextResponse } from 'next/server';
import pool from '../../utils/postgres';
import { getSession } from 'next-auth/react';

export async function GET(request: NextRequest) {
  // Convert request.headers to a plain object for compatibility
  const headers = Object.fromEntries(request.headers);

  // Adjust getSession usage if necessary
  const session = await getSession({ req: { headers } });

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Extract email from query parameters
  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
  }

  try {
    // Connect to the database and fetch user details
    const client = await pool.connect();
    const getUserQuery = `
      SELECT username, address, blood_group, height, weight, phone, profile_picture
      FROM consumer
      WHERE email = $1
    `;
    const result = await client.query(getUserQuery, [email]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
