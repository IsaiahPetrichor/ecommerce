import pool from '../database/pool.js';
import { v4 as uuidv4, parse } from 'uuid';
import format from 'pg-format';
import { Router } from 'express';
import isAdmin from '../util/adminAuth.js';
const product = Router();

// get all products
product.get('/', async (req, res) => {
	try {
		const products = await pool.query('SELECT * FROM product');
		const categories = await pool.query('SELECT * FROM product_category');

		res.json({ products: products.rows, categories: categories.rows });
	} catch (err) {
		res.status(500).json({ msg: 'Database Error...' });
	}
});

// get a single product by uuid
product.get('/:id', (req, res) => {
	const { id } = req.params;

	pool.query('SELECT * FROM product WHERE id = $1', [id], (err, result) => {
		if (err) return res.sendStatus(500);
		if (result.rows[0]) return res.json(result.rows[0]);
		res.sendStatus(404);
	});
});

// add new product
product.post('/', (req, res) => {
	const { name, description, sku, category_id, price } = req.body;

	if (!isAdmin) return;

	pool.query(
		'INSERT INTO product VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
		[uuidv4(), name, description, sku, parse(category_id), price, req.date],
		(err, result) => {
			if (err) return res.status(500).json(err);
			res.status(201).json(result.rows[0]);
		}
	);
});

// update product
product.put('/:id', async (req, res) => {
	const { id } = req.params;
	const body = req.body;

	if (!isAdmin) return;

	// for loop to only send updates for the filled parameters
	for (let key in body) {
		if (body[key] !== '') {
			// uses pg-format in order to allow dynamic queries without risk of SQL injection
			const sql = format('UPDATE product SET %I = $1 WHERE id = $2', key);
			await pool.query(sql, [body[key], id]);
		}
	}
	res.status(201).json('Product updated');
});

// delete product
product.delete('/:id', (req, res) => {
	const { id } = req.params;

	if (!isAdmin) return;

	pool.query('DELETE FROM product WHERE id = $1', [id], (err, result) => {
		if (err) return res.sendStatus(500);
		res.sendStatus(204);
	});
});

export default product;
