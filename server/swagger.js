export default {
	openapi: '3.0.1',
	info: {
		title: 'Sample E-Commerce Application API',
		description: 'Alpha version of an e-commerce server',
		version: '1.0.0',
	},
	servers: [
		{
			url: '/api',
		},
	],
	paths: {
		'/api/login': {},
		'/api/register': {},
		'/api/users': {},
		'/api/users/address': {},
		'/api/users/payment': {},
		'/api/products': {},
		'/api/categories': {},
		'/api/inventory': {},
		'/api/cart': {},
		'/api/cart/items': {},
		'/api/orders': {},
		'/api/orders/items': {},
	},
};
