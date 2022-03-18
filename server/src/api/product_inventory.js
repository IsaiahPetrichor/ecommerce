import pool from '../database/pool.js';
import format from 'pg-format';
import { Router } from 'express';
const inventory = Router();

// get all inventory
inventory.get('/', async (req, res, next) => {
	const inventory = await pool.query('SELECT * FROM product_inventory');
	res.send(inventory.rows);
});

// get product inventory by uuid
inventory.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	const inventory = await pool.query(
		'SELECT * FROM product_inventory WHERE product_id = $1',
		[id]
	);
	if (inventory.rows[0]) {
		res.send(inventory.rows[0]);
	} else {
		res.status(404).send();
	}
});

inventory.post('/', async (req, res, next) => {
	const { quantity, product_id } = req.body;
	const newInventory = await pool.query(
		'INSERT INTO product_inventory VALUES ($1, $2, $3) RETURNING *',
		[product_id, quantity, req.date]
	);
	res.status(201).json(newInventory.rows[0]);
});

inventory.put('/:id', async (req, res, next) => {
	const { id } = req.params;
	const body = req.body;
	// for loop to only send updates for the filled parameters
	for (let key in body) {
		if (body[key] !== '') {
			// uses pg-format in order to allow dynamic queries without risk of SQL injection
			const sql = format(
				'UPDATE product_inventory SET %I = $1 WHERE product_id = $2',
				key
			);
			await pool.query(sql, [body[key], id]);
		}
	}
	await pool.query(
		'UPDATE product_inventory SET updated = $1 WHERE product_id = $2',
		[req.date, id]
	);
	res.status(201).send('Inventory updated');
});

inventory.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	pool.query('DELETE FROM product_inventory WHERE product_id = $1', [id]);
	res.sendStatus(204);
});

export default inventory;
