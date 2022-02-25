import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function (user_id) {
	const payload = {
		user: {
			id: user_id,
		},
	};

	return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '1h' });
}
