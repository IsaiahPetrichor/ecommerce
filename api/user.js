import pool from '../database/pool.js';
import format from 'pg-format';
import bcrypt from 'bcrypt';
import auth from '../util/auth.js';
import isAdmin from '../util/adminAuth.js';
import { Router } from 'express';
const user = Router();
const saltRounds = 10;

const comparePassword = async (pass, hash) => {
  try {
    return await bcrypt.compare(pass, hash);
  } catch (e) {
    console.log(e.message);
  }
  return false;
};

// get a single user by uuid
user.get('/', auth, (req, res, next) => {
  const { user_id } = req.user;

  pool.query(
    'SELECT first_name, last_name, email, admin FROM users WHERE id = $1',
    [user_id],
    (err, result) => {
      if (err) {
        res.status(500).json('Server Error');
        console.log(err.message);
        next();
      }
      if (result.rows[0]) {
        res.json({ user_id, ...result.rows[0] });
      } else {
        res.sendStatus(404);
      }
    }
  );
});

// get user by email
user.get('/email/:email', (req, res, next) => {
  const { email } = req.params;
  pool.query(
    'SELECT email FROM users WHERE email = $1',
    [email],
    (err, result) => {
      if (err) {
        res.status(500).json('Server Error');
        console.log(err.message);
        next();
      }
      if (result.rows[0]) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    }
  );
});

// get all users (admin only)
user.get('/all', auth, (req, res, next) => {
  if (isAdmin(req) === true) return;

  pool.query(
    'SELECT id, first_name, last_name, email, admin FROM users',
    (err, result) => {
      if (err) {
        res.status(500).json('Server Error');
        console.log(err.message);
        next();
      } else {
        res.json(result.rows);
      }
    }
  );
});

// update user (user only)
user.put('/', auth, async (req, res, next) => {
  const { user_id } = req.user;
  const body = req.body;

  const user = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
  if (user.rows[0]) {
    // for loop to only send updates for the filled parameters
    for (let key in body) {
      if (body[key] !== '') {
        if (key === 'newPassword' || key === 'currentPassword') {
          const passMatch = await comparePassword(
            body.currentPassword,
            user.rows[0].password
          );
          if (passMatch) {
            bcrypt.hash(body[key], saltRounds, (err, hash) => {
              pool.query(
                'UPDATE users SET password = $1 WHERE id = $2',
                [hash, user_id],
                (err, result) => {
                  if (err) {
                    console.log(err.message);
                    return err;
                  }
                }
              );
            });
          } else {
            return res.sendStatus(401);
          }
        } else {
          // uses pg-format in order to allow dynamic queries without risk of SQL injection
          const sql = format('UPDATE users SET %I = $1 WHERE id = $2', key);
          pool.query(sql, [body[key], user_id], (err, result) => {
            if (err) {
              console.log(err.message);
              return res.status(500).json('Server Error');
            }
          });
        }
      }
    }
    res.status(201).json('User updated...');
  } else {
    res.sendStatus(404);
  }
});

// delete user (user for own account)
user.delete('/', auth, async (req, res, next) => {
  const { user_id } = req.user;
  pool.query('DELETE FROM users WHERE id = $1', [user_id], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
});

// delete user (admin only)
user.delete('/admin/:id', (req, res) => {
  const { id } = req.params;

  if (!isAdmin) return;

  pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.sendStatus(204);
    }
  });
});

export default user;
