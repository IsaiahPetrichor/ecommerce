import pool from '../database/pool.js';
import { Router } from 'express';
const user = Router();

user.get('/', (req, res, next) => {
	pool.query('SELECT * FROM users', (err, res) => {
		if (err) {
			console.log(err.stack);
		}
	});
	res.send(res.rows);
});

user.post('/', async (req, res, next) => {
	const newUser = await pool.query(
		'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7)',
		[
			2,
			'Isaiah',
			'Petrichor',
			'petrichorwebdasdev@gmail.com',
			'asdasdasd',
			req.date,
			'4252299117',
		]
	);
	if (newUser) {
		res.status(201).send('User created');
	}
});

export default user;
