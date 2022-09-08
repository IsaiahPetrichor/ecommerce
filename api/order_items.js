import auth from '../util/auth.js';
import pool from '../database/pool.js';
import { Router } from 'express';
const orderItems = Router();

// get items for all displayed orders

// get items in an order

// post items from order
orderItems.post('/', auth, (req, res) => {
  const { order, products } = req.body;
  const order_id = order[0].id;

  let query = '';

  products.forEach((product) => {
    query += `('${order_id}', '${product.product_id}', ${product.quantity}), `;
  });

  const finalQuery = `INSERT INTO order_item(order_id, product_id, quantity) VALUES ${query.slice(
    0,
    -2
  )}`;

  pool.query(finalQuery, [], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(500);
    }
    res.sendStatus(201);
  });
});

export default orderItems;
