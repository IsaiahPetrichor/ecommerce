import auth from '../util/auth.js';
import pool from '../database/pool.js';
import { Router } from 'express';
const orderItems = Router();

// get items for all displayed orders

// get items in an order

// post items from order
orderItems.post('/', auth, (req, res) => {
	const { order, products } = req.body;
	const order_id = order[0].id;

	let error = '';

	console.log(order_id);

	products.forEach((product) => {
		if (error !== '') return;
		pool.query(
			'INSERT INTO order_item VALUES ($1, $2, $3) RETURNING *',
			[order_id, product.product_id, product.quantity],
			(err, result) => {
				if (err) {
					error = err.message;
				} else {
					console.log(result.rows);
				}
			}
		);
	});

	console.log(error);

	if (!error) return res.sendStatus(201);
	res.sendStatus(500);
});

export default orderItems;
