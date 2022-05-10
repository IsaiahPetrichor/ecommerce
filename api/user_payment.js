import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
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
userPayment.post('/', auth, (req, res, next) => {
	const { user_id } = req.user;
	const { type, provider, card_number, expiration, full_name } = req.body;
	const card_name = req.body.card_name ? req.body.card_name : 'Unnamed';
	pool.query(
		'INSERT INTO user_payment VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
		[
			uuidv4(),
			user_id,
			type,
			provider,
			card_number,
			expiration,
			card_name,
			full_name,
		],
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
	const { type, card_number, expiration, card_name } = req.body;
	pool.query(
		'UPDATE user_payment SET type = $2, card_number = $3, expires = $4, card_name = $5 WHERE id = $1',
		[id, type, card_number, expiration, card_name],
		(err, response) => {
			if (err) {
				res.status(500).json('Server Error...');
			} else {
				res.status(201).json(response.rows[0]);
			}
		}
	);
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
