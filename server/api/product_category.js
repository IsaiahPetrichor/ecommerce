import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import format from 'pg-format';
import { Router } from 'express';
const category = Router();

// get all categories
category.get('/', async (req, res, next) => {
	const categories = await pool.query('SELECT * FROM product_category');
	res.send(categories.rows);
});

// get a single category by uuid
category.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const category = await pool.query(
		'SELECT * FROM product_category WHERE id = $1',
		[id]
	);
	if (category.rows[0]) {
		res.send(category.rows[0]);
	} else {
		res.status(404).send();
	}
});

category.post('/', async (req, res, next) => {
	const { name, description } = req.body;
	const newcategory = await pool.query(
		'INSERT INTO product_category VALUES ($1, $2, $3) RETURNING *',
		[uuidv4(), name, description]
	);
	res.status(201).json(newcategory.rows[0]);
});

category.put('/:id', async (req, res, next) => {
	const { id } = req.params;
	const body = req.body;
	// for loop to only send updates for the filled parameters
	for (let key in body) {
		if (body[key] !== '') {
			// uses pg-format in order to allow dynamic queries without risk of SQL injection
			const sql = format(
				'UPDATE product_category SET %I = $1 WHERE id = $2',
				key
			);
			await pool.query(sql, [body[key], id]);
		}
	}
	res.status(201).send('category updated');
});

category.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	pool.query('DELETE FROM product_category WHERE id = $1', [id]);
	res.sendStatus(204);
});

export default category;
