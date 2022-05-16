import express from 'express';
import bodyParser from 'body-parser';
import { time } from './util/time.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	// serve static content
	app.use(express.static(decodeURI(path.join(__dirname, '/client/build'))));
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(time);
app.use(bodyParser.json());
app.use(cors());

// Registration Route
import registerRouter from './api/register.js';
app.use('/api/register', registerRouter);

// Login Route
import loginRouter from './api/login.js';
app.use('/api/login', loginRouter);

// User Routes
import userRouter from './api/user.js';
app.use('/api/users', userRouter);

import userAddress from './api/user_address.js';
app.use('/api/user_address', userAddress);

import userPayment from './api/user_payment.js';
app.use('/api/user_payment', userPayment);

// Product Routes
import productRouter from './api/product.js';
app.use('/api/products', productRouter);

import categoryRouter from './api/product_category.js';
app.use('/api/categories', categoryRouter);

import inventoryRouter from './api/product_inventory.js';
app.use('/api/inventory', inventoryRouter);

// Cart Route
import cartRouter from './api/cart.js';
app.use('/api/cart', cartRouter);

// Order Routes
import orderRouter from './api/order.js';
app.use('/api/orders', orderRouter);

import orderItems from './api/order_items.js';
app.use('/api/order_items', orderItems);

if (process.env.NODE_ENV === 'production') {
	// catchall
	app.get('*', (req, res) => {
		res.sendFile(decodeURI(path.join(__dirname, '/client/build/index.html')));
	});
}

// Server initialize
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`);
});
