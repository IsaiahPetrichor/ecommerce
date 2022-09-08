import { Router } from 'express';
import pool from '../database/pool.js';
import auth from '../util/auth.js';
import wipeDefaults from '../util/wipe_defaults.js';
import { v4 as uuidv4 } from 'uuid';
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
userAddress.post('/', auth, async (req, res) => {
  const { user_id } = req.user;
  const {
    address_name,
    first_name,
    last_name,
    line_1,
    line_2,
    city,
    state,
    postal,
    is_default,
  } = req.body;

  await wipeDefaults(req);

  pool.query(
    'INSERT INTO user_address VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
    [
      uuidv4(),
      user_id,
      address_name,
      first_name,
      last_name,
      line_1,
      line_2,
      city,
      state,
      postal,
      is_default,
    ],
    (err, result) => {
      if (err) return res.sendStatus(500);
      res.status(201).json(result.rows[0]);
    }
  );
});

// update address
userAddress.put('/:id', auth, (req, res) => {
  const { id } = req.params;
  const {
    address_name,
    first_name,
    last_name,
    line_1,
    line_2,
    city,
    state,
    postal,
    is_default,
  } = req.body;

  wipeDefaults(req);

  pool.query(
    'UPDATE user_address SET address_name = $2, first_name = $3, last_name = $4, line_1 = $5, line_2 = $6, city = $7, state = $8, postal = $9, is_default = $10 WHERE id = $1',
    [
      id,
      address_name,
      first_name,
      last_name,
      line_1,
      line_2,
      city,
      state,
      postal,
      is_default,
    ],
    (err, response) => {
      if (err) {
        console.log(err.message);
        res.status(500).json('Server Error...');
      } else {
        res.sendStatus(201);
      }
    }
  );
});

// delete address
userAddress.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user;

  pool.query(
    'DELETE FROM user_address WHERE id = $1 AND user_id = $2',
    [id, user_id],
    (err, result) => {
      if (err) return res.sendStatus(500);
      res.sendStatus(204);
    }
  );
});

export default userAddress;
