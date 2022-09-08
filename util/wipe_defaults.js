import pool from '../database/pool.js';

export default async function (req) {
  const { user_id } = req.user;

  if (req.body.is_default === true) {
    const existing = await pool.query(
      'SELECT * FROM user_address WHERE user_id = $1',
      [user_id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'UPDATE user_address SET is_default = false WHERE user_id = $1',
        [user_id]
      );
    }
  }
}
