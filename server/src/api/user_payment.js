import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import format from 'pg-format';
import { Router } from 'express';
import auth from '../util/auth.js';
const userPayment = Router();

// get all payments for a user
userPayment.get('/', auth, (req, res, next) => {
	const { user_id } = req.user;

	pool.query(
		'SELECT * FROM user_payment WHERE user_id = $1',
		[user_id],
		(err, result) => {
			if (err) {
				res.status(500).json('Database Error!');
				console.log(err.message);
				next();
			} else {
				res.json(result.rows);
			}
		}
	);
});

/* // get a single payment for a user
userPayment.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const {payment_id} = req.body;

	const payment = await pool.query(
		'SELECT * FROM user_payment WHERE id = $1 AND user_id = $2',
		[payment_id, id]
	);
	if (payment.rows[0]) {
		res.send(payment.rows[0]);
	} else {
		res.status(404).send();
	}
}); */

// add a new payment
userPayment.post('/', auth, async (req, res, next) => {
	const { user_id } = req.user;
	const { type, provider, card_number, expiration, card_name } = req.body;
	pool.query(
		'INSERT INTO user_payment VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
		[uuidv4(), user_id, type, provider, card_number, expiration, card_name],
		(err, response) => {
			if (err) {
				res.status(500).json('Server Error...');
			} else {
				res.status(201).json(response.rows[0]);
			}
		}
	);
});

// update a payment
userPayment.put('/:id', auth, (req, res, next) => {
	const { id } = req.params;
	const body = req.body;
	// for loop to only send updates for the filled parameters
	for (let key in body) {
		if (body[key] !== '') {
			// uses pg-format in order to allow dynamic queries without risk of SQL injection
			const sql = format('UPDATE user_payment SET %I = $1 WHERE id = $2', key);
			pool.query(sql, [body[key], id], (err, result) => {
				if (err) {
					res.status(500).json('Server Error...');
				} else {
					res.status(201).json('User updated');
				}
			});
		}
	}
});

// delete a payment
userPayment.delete('/:id', auth, (req, res, next) => {
	const { id } = req.params;
	pool.query(
		'DELETE FROM user_payment WHERE id = $1',
		[id],
		(err, response) => {
			if (err) {
				res.status(500).json('Server Error...');
			} else {
				res.status(200).json('Card Deleted.');
			}
		}
	);
});

export default userPayment;
