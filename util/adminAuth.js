import pool from '../database/pool.js';

const isAdmin = (req) => {
	const { user_id } = req.user;

	pool.query(
		'SELECT admin FROM users WHERE id = $1',
		[user_id],
		(err, result) => {
			if (err) return false;
			if (result.rows[0].admin === true) {
				return true;
			}
			return false;
		}
	);
};

export default isAdmin;
