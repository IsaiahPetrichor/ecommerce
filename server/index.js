import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const PORT = process.env.port || 5000;

const timeMiddleware = (req, res, next) => {
	req.date = new Date();
	next();
};
app.use(timeMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));

import userRouter from './api/user.js';
app.use('/api/users', userRouter);

import productRouter from './api/product.js';
app.use('/api/products', productRouter);

import orderRouter from './api/order.js';
app.use('/api/orders', orderRouter);

import cartRouter from './api/cart.js';
app.use('/api/cart', cartRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});
