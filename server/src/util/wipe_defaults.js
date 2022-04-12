import pool from '../database/pool.js';

export default function (req) {
	const { user_id } = req.user;

	if (req.body.is_default === true) {
		pool.query(
			'UPDATE user_address SET is_default = false WHERE user_id = $1',
			[user_id],
			(err, result) => {
				if (err) {
					return err;
				}
			}
		);
	}
}
