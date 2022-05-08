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
cart.post('/', auth, async (req, res) => {
	const { user_id } = req.user;
	const { product_id, quantity } = req.body;

	const existingProduct = await pool.query(
		'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
		[user_id, product_id]
	);

	if (existingProduct.rowCount > 0) {
		const newQuantity = quantity + existingProduct.rows[0].quantity;

		pool.query(
			'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
			[newQuantity, user_id, product_id],
			(err, result) => {
				if (err) return res.sendStatus(500);
				res.sendStatus(201);
			}
		);
	} else {
		pool.query(
			'INSERT INTO cart VALUES ($1, $2, $3)',
			[user_id, product_id, quantity],
			(err, result) => {
				if (err) return res.sendStatus(500);
				res.sendStatus(201);
			}
		);
	}
});

// delete all items from cart (after checkout)
cart.delete('/', auth, (req, res) => {
	const { user_id } = req.user;

	pool.query(
		'DELETE FROM cart WHERE user_id = $1',
		[user_id],
		(err, result) => {
			if (err) return res.sendStatus(500);
			res.sendStatus(204);
		}
	);
});

// delete item from cart
cart.delete('/:id', auth, (req, res) => {
	const { user_id } = req.user;
	const { id } = req.params;

	pool.query(
		'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
		[user_id, id],
		(err, result) => {
			if (err) return res.sendStatus(500);
			res.sendStatus(204);
		}
	);
});

export default cart;
