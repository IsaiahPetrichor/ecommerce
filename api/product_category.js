import pool from '../database/pool.js';
import { v4 as uuidv4 } from 'uuid';
import format from 'pg-format';
import isAdmin from '../util/adminAuth.js';
import { Router } from 'express';
const category = Router();

// get all categories
category.get('/', (req, res) => {
  pool.query('SELECT * FROM product_category', (err, result) => {
    if (err) return res.sendStatus(500);
    res.send(result.rows);
  });
});

// get a single category by uuid
category.get('/:id', (req, res) => {
  const { id } = req.params;

  pool.query(
    'SELECT * FROM product_category WHERE id = $1',
    [id],
    (err, result) => {
      if (err) return res.sendStatus(500);
      if (result.rows[0]) return res.send(result.rows[0]);
      res.sendStatus(404);
    }
  );
});

category.post('/', async (req, res, next) => {
  const { name, description } = req.body;

  if (!isAdmin) return;

  const newcategory = await pool.query(
    'INSERT INTO product_category VALUES ($1, $2, $3) RETURNING *',
    [uuidv4(), name, description]
  );
  res.status(201).json(newcategory.rows[0]);
});

category.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  if (!isAdmin) return;

  // for loop to only send updates for the filled parameters
  for (let key in body) {
    if (body[key] !== '') {
      // uses pg-format in order to allow dynamic queries without risk of SQL injection
      const sql = format(
        'UPDATE product_category SET %I = $1 WHERE id = $2',
        key
      );
      await pool.query(sql, [body[key], id]);
    }
  }
  res.status(201).send('category updated');
});

category.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!isAdmin) return;

  pool.query('DELETE FROM product_category WHERE id = $1', [id]);
  res.sendStatus(204);
});

export default category;
