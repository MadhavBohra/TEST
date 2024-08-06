import { Pool } from 'pg';

interface PoolConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
const poolConfig: PoolConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'MyEasyPharma',
};

const pool = new Pool(poolConfig);

export default pool;
