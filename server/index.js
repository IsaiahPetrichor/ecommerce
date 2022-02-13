import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import { timeMiddleware, errorHandler } from './custom_middleware.js';

const PORT = process.env.port || 5000;

// middleware for timestamps
app.use(timeMiddleware);
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// error handler middleware
app.use(errorHandler);

// User Routes
import userRouter from './api/user.js';
app.use('/api/users', userRouter);

import userAddress from './api/user_address.js';
app.use('/api/users/address', userAddress);

import userPayment from './api/user_payment.js';
app.use('/api/users/payment', userPayment);

// Product Routes
import productRouter from './api/product.js';
app.use('/api/products', productRouter);

import categoryRouter from './api/product_category.js';
app.use('/api/categories', categoryRouter);

import inventoryRouter from './api/product_inventory.js';
app.use('/api/inventory', inventoryRouter);

// Cart Routes
import cartRouter from './api/cart.js';
app.use('/api/cart', cartRouter);

import cartItems from './api/cart_items.js';
app.use('/api/cart/items', cartItems);

// Order Routes
import orderRouter from './api/order.js';
app.use('/api/orders', orderRouter);

import orderItems from './api/order_items.js';
app.use('/api/orders/items', orderItems);

// Server initialize
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});
