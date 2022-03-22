import pool from '../database/pool.js';
import jwtGenerator from '../util/generator.js';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import { loginValidator } from '../util/validator.js';
const login = Router();

login.post('/', loginValidator, (req, res) => {
	const { email, password } = req.body;

	pool.query(
		'SELECT * FROM users WHERE email = $1',
		[email],
		async (err, response) => {
			if (err) {
				console.log(err.message);
				res.status(500).json('Server error');
			} else {
				if (response.rows.length === 0) {
					return res.status(401).json('Invalid Email or Password');
				}

				const validPassword = await bcrypt.compare(
					password,
					response.rows[0].password
				);

				if (!validPassword) {
					return res.status(401).json('Invalid Email or Password');
				}

				const jwtToken = jwtGenerator(response.rows[0].id);
				const firstName = response.rows[0].first_name;
				return res.json({ firstName, jwtToken });
			}
		}
	);
});

export default login;
