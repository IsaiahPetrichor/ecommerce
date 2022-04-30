import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { Router } from 'express';
const register = Router();
import { registerValidator } from '../util/validator.js';
import jwtGenerator from '../util/generator.js';

register.post('/', registerValidator, (req, res, next) => {
	const { first_name, last_name, email, password, phone } = req.body;

	pool.query(
		'SELECT email FROM users WHERE email = $1',
		[email],
		(err, result) => {
			if (err) return res.sendStatus(500);
			if (result.rows.length > 0) {
				return res.status(401).json('Email already in use!');
			}
		}
	);

	if (password.length < 5) {
		return res.status(400).json('Password too short!');
	}

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			return res.status(500).json('Server error');
		}
		pool.query(
			'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			[uuidv4(), first_name, last_name, email, hash, phone, req.date],
			(err, result) => {
				if (err) {
					console.log(err.message);
					res.status(400).json('Bad request...');
				} else {
					const jwt_token = jwtGenerator({
						name: result.rows[0].first_name,
						user_id: result.rows[0].id,
					});
					const first_name = result.rows[0].first_name;

					res.status(201).json({ first_name, jwt_token });
				}
			}
		);
	});
});

export default register;
