import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function (req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	console.log(token);

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			console.log(err);
			res.sendStatus(403);
		} else {
			req.user = user;
			next();
		}
	});
}
