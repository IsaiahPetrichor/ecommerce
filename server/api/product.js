import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import format from 'pg-format';
import { Router } from 'express';
const product = Router();

// get all products
product.get('/', async (req, res, next) => {
	try {
		const products = await pool.query('SELECT * FROM product');
		res.send(products.rows);
	} catch (e) {
		console.log(e.stack);
		res.sendStatus(500);
	}
});

// get a single product by uuid
product.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await pool.query('SELECT * FROM product WHERE id = $1', [
			id,
		]);
		if (product.rows[0]) {
			res.send(product.rows[0]);
		} else {
			res.status(404).send();
		}
	} catch (e) {
		console.log(e.stack);
		res.status(400).send('Bad request...');
	}
});

product.post('/', async (req, res, next) => {
	try {
		const { name, description, sku, category_id, price } = req.body;
		const newProduct = await pool.query(
			'INSERT INTO product VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
			[uuidv4(), name, description, sku, category_id, price, req.date]
		);
		res.status(201).json(newProduct.rows[0]);
	} catch (e) {
		console.log(e.stack);
		res.status(400).send('Bad request...');
	}
});

product.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		// for loop to only send updates for the filled parameters
		for (let key in body) {
			if (body[key] !== '') {
				// uses pg-format in order to allow dynamic queries without risk of SQL injection
				const sql = format('UPDATE product SET %I = $1 WHERE id = $2', key);
				await pool.query(sql, [body[key], id]);
			}
		}
		res.status(201).send('Product updated');
	} catch (e) {
		console.log(e.stack);
		res.status(400).send('Bad request...');
	}
});

product.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		pool.query('DELETE FROM product WHERE id = $1', [id]);
		res.sendStatus(204);
	} catch (e) {
		console.log(e.stack);
		res.status(404).send('Delete failed');
	}
});

export default product;
