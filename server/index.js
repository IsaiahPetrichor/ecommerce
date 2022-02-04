// ecommerce rest api
import express from 'express';
const app = express();

const PORT = process.env.port || 5000;

app.listen(() => {
	console.log(`Server running on port ${PORT}...`);
});
