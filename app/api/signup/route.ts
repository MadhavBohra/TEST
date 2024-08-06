import { NextRequest, NextResponse } from 'next/server';
import pool from '../../utils/postgres';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Use a strong secret key for signing the JWT

export async function POST(req: NextRequest) {
    const { email, username, password } = await req.json();

    console.log("Received signup request:", { email, username, password });

    let client;

    try {
        client = await pool.connect();
        console.log("Database connection established");

        // Start a transaction
        await client.query('BEGIN');

        try {
            const query = `
                SELECT * FROM credentials WHERE email = $1;
            `;
            const result = await client.query(query, [email]);
            console.log("Query result:", result.rows);

            if (result.rows.length === 0) {
                // Insert new values into the credentials table and get the generated consumer_id
                const q2 = `
                    INSERT INTO credentials (username, email, password)
                    VALUES ($1, $2, $3)
                    RETURNING consumer_id;
                `;
                const q2Result = await client.query(q2, [username, email, password]);
                const consumerid = q2Result.rows[0].consumer_id;
                console.log("Generated consumer_id:", consumerid);

                const q3 = `
                    INSERT INTO consumer (customer_id, username, email, phone_number, blood_group, address, date_of_birth, height, weight)
                    VALUES ($1, $2, $3, '1234567890', 'B+', 'BITS GOA', '1995-06-15', 170, 70);
                `;
                await client.query(q3, [consumerid, username, email]);
                console.log("Values inserted into consumer");

                // Commit the transaction
                await client.query('COMMIT');

                // Generate JWT token
                const token = jwt.sign(email, JWT_SECRET, { expiresIn: '1h' });
                console.log("JWT token generated:", token);

                // Set the token in a cookie and perform the redirect
                const response = NextResponse.redirect(`${req.nextUrl.origin}/UserDashboard`);
                response.headers.set('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure=${process.env.NODE_ENV === 'production'}`);

                return NextResponse.json({ message: 'Login successful', token });
            } else {
                // Rollback the transaction
                await client.query('ROLLBACK');

                return NextResponse.json({ message: 'User already exists' }, { status: 409 });
            }
        } catch (err) {
            console.error("Error running queries", err);

            // Rollback the transaction in case of an error
            await client.query('ROLLBACK');

            return NextResponse.json({ message: 'Query error' }, { status: 500 });
        }
    } catch (err) {
        console.error("Database connection failed", err);

        return NextResponse.json({ message: 'Database connection error' }, { status: 500 });
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
        }
    }
}
