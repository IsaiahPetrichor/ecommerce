import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import format from 'pg-format';
import { Router } from 'express';
const userPayment = Router();

// get all payments for a user
userPayment.get('/', (req, res, next) => {
	pool.query(
		'SELECT * FROM user_payment WHERE user_id = $1',
		[user_id],
		(err, result) => {
			if (err) {
				res.status(500).send('Database Error!');
				console.log(err.message);
				next();
			} else {
				res.send(result.rows);
			}
		}
	);
});

// get a single payment for a user
userPayment.get('/:id', async (req, res, next) => {
	const { payment_id } = req.params;
	const payment = await pool.query(
		'SELECT * FROM user_payment WHERE id = $1 AND user_id = $2',
		[payment_id, user_id]
	);
	if (payment.rows[0]) {
		res.send(payment.rows[0]);
	} else {
		res.status(404).send();
	}
});

// add a new payment
userPayment.post('/', async (req, res, next) => {
	const { type, provider, card_number, expiration, user_id } = req.body;
	const newPayment = await pool.query(
		'INSERT INTO user_payment VALUES ($1, $2, $3, $4, $5) RETURNING *',
		[uuidv4(), user_id, type, provider, card_number, expiration]
	);
	res.status(201).json(newPayment.rows[0]);
});

// update a payment
userPayment.put('/:id', async (req, res, next) => {
	const { payment_id } = req.params;
	const body = req.body;
	// for loop to only send updates for the filled parameters
	for (let key in body) {
		if (body[key] !== '') {
			// uses pg-format in order to allow dynamic queries without risk of SQL injection
			const sql = format('UPDATE user_payment SET %I = $1 WHERE id = $2', key);
			await pool.query(sql, [body[key], payment_id]);
		}
	}
	res.status(201).send('User updated');
});

// delete a payment
userPayment.delete('/:id', async (req, res, next) => {
	const { payment_id } = req.params;
	pool.query('DELETE FROM user_payment WHERE id = $1', [payment_id]);
	res.sendStatus(204);
});

export default userPayment;
