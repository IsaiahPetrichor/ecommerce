import pool from '../database/pool.js';
import format from 'pg-format';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import { Router } from 'express';
const user = Router();

// get all users (admin only)
user.get('/', (req, res, next) => {
	pool.query('SELECT * FROM users', (err, result) => {
		if (err) {
			res.status(500).send('Database Error!');
			console.log(err.message);
			next();
		} else {
			res.send(result.rows);
		}
	});
});

// get a single user by uuid (if user, only some of their own data)
user.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
		if (err) {
			res.status(500).send('Database Error!');
			console.log(err.message);
			next();
		}
		if (result.rows[0]) {
			res.send(result.rows[0]);
		} else {
			res.status(404).send();
		}
	});
});

// update user (user only)
user.put('/:id', async (req, res, next) => {
	const { id } = req.params;
	const body = req.body;

	const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	if (user.rows[0]) {
		// for loop to only send updates for the filled parameters
		for (let key in body) {
			if (body[key] !== '') {
				if (key === 'password') {
					await bcrypt.hash(body[key], saltRounds, (err, hash) => {
						pool.query(
							'UPDATE users SET password = $1 WHERE id = $2',
							[hash, id],
							(err, result) => {
								if (err) {
									res.status(500).send('Database Error');
									console.log(err.message);
									next();
								}
							}
						);
					});
				} else {
					// uses pg-format in order to allow dynamic queries without risk of SQL injection
					const sql = format('UPDATE users SET %I = $1 WHERE id = $2', key);
					await pool.query(sql, [body[key], id], (err, result) => {
						if (err) {
							res.status(500).send('Database Error');
							console.log(err.message);
							next();
						}
					});
				}
			}
		}
		res.status(201).send('User updated...');
	} else {
		res.status(404).send();
	}
});

// delete user (admin / user for own account)
user.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
		if (err) {
			console.log(err.message);
		} else {
			res.sendStatus(204);
		}
	});
});

export default user;
