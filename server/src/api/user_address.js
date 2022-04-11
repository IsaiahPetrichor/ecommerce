import { Router } from 'express';
import pool from '../database/pool.js';
import auth from '../util/auth.js';
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
});

// update address

// delete address

export default userAddress;
