import { response, Router } from 'express';
import pool from '../database/pool.js';
import auth from '../util/auth.js';
import { v4 as uuidv4 } from 'uuid';
const userAddress = Router();

// get user addresses
userAddress.get('/', auth, (req, res) => {
	const { user_id } = req.user;

	pool.query(
		'SELECT * FROM user_address WHERE user_id = $1',
		[user_id],
		(err, result) => {
			if (err) return res.sendStatus(500);
			res.status(200).json(result.rows);
		}
	);
});

// post new address
userAddress.post('/', auth, (req, res) => {
	const { user_id } = req.user;
	const {
		address_name,
		first_name,
		last_name,
		line_1,
		line_2,
		city,
		state,
		postal,
		is_default,
	} = req.body;

	pool.query(
		'INSERT INTO user_address VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
		[
			uuidv4(),
			user_id,
			address_name,
			first_name,
			last_name,
			line_1,
			line_2,
			city,
			state,
			postal,
			is_default,
		],
		(err, result) => {
			if (err) return res.sendStatus(500);
			res.status(201).json(result.rows[0]);
		}
	);
});

// update address

// delete address

export default userAddress;
