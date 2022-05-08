import auth from '../util/auth.js';
import { time } from '../util/time.js';
import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import pool from '../database/pool.js';
const order = Router();

// get user orders
order.get('/', auth, async (req, res) => {
	const { user_id } = req.user;

	try {
		const details = await pool.query(
			'SELECT * FROM order_details WHERE user_id = $1',
			[user_id]
		);
		res.json(details.rows);
	} catch (err) {
		res.sendStatus(500);
	}
});

// get single order
order.get('/:id', auth, async (req, res) => {
	const { user_id } = req.user;
	const { id } = req.params;

	try {
		const details = await pool.query(
			'SELECT * FROM order_details WHERE user_id = $1 AND id = $2',
			[user_id, id]
		);

		const items = await pool.query(
			'SELECT * FROM order_item WHERE order_id = $1',
			[id]
		);

		res.json({ details, items });
	} catch (err) {
		res.sendStatus(500);
	}
});

// post new order
order.post('/', [auth, time], async (req, res) => {
	const { user_id } = req.user;
	const { payment_id, total, address_id } = req.body;

	try {
		pool.query(
			'INSERT INTO order_details VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			[uuidv4(), user_id, payment_id, 'pending', total, address_id, req.date],
			(err, result) => {
				if (err) return res.sendStatus(500);
				return res.status(201).json(result.rows);
			}
		);
	} catch (err) {
		res.sendStatus(500);
	}
});

export default order;
