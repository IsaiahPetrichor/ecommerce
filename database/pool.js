import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

const devConfig = {
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	port: process.env.PGPORT,
};

const productionConfig = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};
const pool = new Pool(
	process.env.NODE_ENV === 'production' ? productionConfig : devConfig
);

pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

export default pool;
