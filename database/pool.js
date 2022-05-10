import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}?sslmode=require`;

const pool = new Pool({
	connectionString,
});

pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

export default pool;
