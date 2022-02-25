import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { Router } from 'express';
const register = Router();
import { registerValidator } from '../util/validator.js';
import jwtGenerator from '../util/generator.js';

register.post('/', registerValidator, async (req, res, next) => {
	const { first_name, last_name, email, password, phone } = req.body;

	try {
		const user = await pool.query('SELECT email FROM users WHERE email = $1', [
			email,
		]);

		if (user.rows.length > 0) {
			return res.status(401).send('Email already in use!');
		}
	} catch (e) {
		console.log(err.message);
		res.status(500).send('Server error');
	}

	if (password.length < 5) {
		return res.status(400).send('Password too short!');
	}

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			return res.status(500).send('Server error');
		}
		pool.query(
			'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			[uuidv4(), first_name, last_name, email, hash, phone, req.date],
			(err, result) => {
				if (err) {
					console.log(err.message);
					res.status(400).send('Bad request...');
				} else {
					const jwtToken = jwtGenerator(result.rows[0].id);

					res.status(201).json({ jwtToken });
				}
			}
		);
	});
});

export default register;
