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
    async (err, result) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json('Server error');
      }
      if (result.rows.length === 0) {
        return res.status(401).json('Wrong Email or Password');
      }

      const validPassword = await bcrypt.compare(
        password,
        result.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json('Wrong Email or Password');
      }

      const user_id = result.rows[0].id;
      const first_name = result.rows[0].first_name;
      const admin = result.rows[0].admin;

      const token = jwtGenerator({
        name: result.rows[0].first_name,
        user_id: result.rows[0].id,
      });

      return res.json({
        user_id,
        first_name,
        admin,
        jwt_token: token,
      });
    }
  );
});

export default login;
