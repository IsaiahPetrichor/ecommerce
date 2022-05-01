import pool from '../database/pool.js';
import auth from '../util/auth.js';
import { Router } from 'express';
const cart = Router();

// get all items in user cart
cart.get('/', auth, (req, res) => {
	const { user_id } = req.user;

	pool.query(
		'SELECT * FROM cart WHERE user_id = $1',
		[user_id],
		(err, result) => {
			if (err) return res.sendStatus(500);
			res.status(200).json(result.rows);
		}
	);
});

// post a new item to cart
cart.post('/', auth, (req, res) => {
	const { user_id } = req.user;
	const { product_id, quantity } = req.body;

	pool.query(
		'INSERT INTO cart VALUES ($1, $2, $3)',
		[user_id, product_id, quantity],
		(err, result) => {
			if (err) return res.sendStatus(500);
			res.sendStatus(201);
		}
	);
});

export default cart;
