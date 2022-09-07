import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function (user) {
	return jwt.sign(user, process.env.JWT_SECRET);
}
