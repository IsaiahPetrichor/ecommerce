import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { Router } from 'express';
const register = Router();

register.post('/', async (req, res, next) => {
	const { first_name, last_name, email, password, phone } = req.body;
	await bcrypt.hash(password, saltRounds, (err, hash) => {
		pool.query(
			'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			[uuidv4(), first_name, last_name, email, hash, phone, req.date],
			(err, result) => {
				if (err) {
					console.log(err.message);
					res.status(400).send('Bad request...');
				} else {
					res
						.status(201)
						.send(
							`User created: ${result.rows[0].first_name}\n Email: ${result.rows[0].email}`
						);
				}
			}
		);
	});
});

export default register;
