import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function (req, res, next) {
	const token = req.header('jwt_token');

	if (!token) {
		return res.status(403).json({ msg: 'Not Authorized' });
	}

	try {
		const verify = jwt.verify(token, process.env.JWTSECRET);
		req.user = verify.user;
		next();
	} catch (e) {
		res.status(401).json({ msg: 'Invalid Token' });
	}
}
