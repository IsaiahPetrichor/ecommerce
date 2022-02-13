import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import format from 'pg-format';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { Router } from 'express';
const user = Router();

// get all users
user.get('/', async (req, res, next) => {
	try {
		const users = await pool.query('SELECT * FROM users');
		res.send(users.rows);
	} catch (e) {
		console.log(e.stack);
	}
});

// get a single user by uuid
user.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
		if (user.rows[0]) {
			res.send(user.rows[0]);
		} else {
			res.status(404).send();
		}
	} catch (e) {
		console.log(e.stack);
		res.status(400).send('Bad request...');
	}
});

user.post('/', async (req, res, next) => {
	try {
		const { first_name, last_name, email, password, phone } = req.body;
		await bcrypt.hash(password, saltRounds, async (err, hash) => {
			const newUser = await pool.query(
				'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
				[first_name, last_name, email, hash, req.date, phone, uuidv4()]
			);
			res.status(201).json(newUser.rows[0]);
		});
	} catch (e) {
		console.log(e.stack);
		res.status(400).send('Bad request...');
	}
});

user.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		// for loop to only send updates for the filled parameters
		for (let key in body) {
			if (body[key] !== '') {
				// uses pg-format in order to allow dynamic queries without risk of SQL injection
				const sql = format('UPDATE users SET %I = $1 WHERE id = $2', key);
				await pool.query(sql, [body[key], id]);
			}
		}
		res.status(201).send('User updated');
	} catch (e) {
		console.log(e.stack);
		res.status(400).send('Bad request...');
	}
});

user.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		pool.query('DELETE FROM users WHERE id = $1', [id]);
		res.sendStatus(204);
	} catch (e) {
		console.log(e.stack);
		res.status(404).send('Delete failed');
	}
});

export default user;
