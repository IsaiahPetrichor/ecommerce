export default {
	openapi: '3.0.1',
	info: {
		title: 'Petrichor Coffee API',
		description:
			'Fictional coffee shop server providing authorization, products, and checkout',
		version: '1.0.0',
		contact: {
			name: 'Isaiah Petrichor',
			email: 'petrichorwebdev@gmail.com',
		},
	},
	servers: [
		{
			url: '/api',
			description: 'Localhost development server',
		},
	],
	paths: {
		'/api/login': {
			post: {
				summary: 'Login to the website/api',
				description: 'Returns json web token for later authentication',
				requestBody: {
					description: 'Takes users email and password',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									email: {
										description: 'User email',
										type: 'string',
									},
									password: {
										description: 'User password',
										type: 'string',
									},
								},
							},
						},
					},
					required: true,
				},
				responses: {
					200: {
						description: 'JSON Web Token',
						content: {
							'application/json': {
								example: {
									jwtToken:
										'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDJhNmUwYWQtNGU5NC00MTJiLWJhOWItYjc3MTUxZTQ0MmJjIn0sImlhdCI6MTY0NTc2NjE4NCwiZXhwIjoxNjQ1NzY5Nzg0fQ.LasSvIgSY3pD_dWOYhOAa2GaSdAsdYWVUwNpZqHum0w',
								},
							},
						},
					},
					401: {
						description: 'Invalid credentials given',
						content: {
							'text/plain': {
								example: 'Invalid Email or Password',
							},
						},
					},
					500: {
						description: 'Returns if there is a server error',
						content: {
							'text/plain': {
								example: 'Server error',
							},
						},
					},
				},
			},
		},
		'/api/register': {
			post: {
				summary: 'Register to the website/api',
				description: 'Adds user to the database and returns JSON Web Token',
				requestBody: {
					description: 'Takes user info',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									first_name: {
										description: 'User first name',
										type: 'string',
									},
									last_name: {
										description: 'User last name',
										type: 'string',
									},
									email: {
										description: 'User email',
										type: 'string',
									},
									password: {
										description: 'User password',
										type: 'string',
									},
									phone: {
										description: 'User phone number',
										type: 'string',
									},
								},
							},
						},
					},
					required: true,
				},
				responses: {
					201: {
						description: 'JSON Web Token',
						content: {
							'application/json': {
								example: {
									jwtToken:
										'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDJhNmUwYWQtNGU5NC00MTJiLWJhOWItYjc3MTUxZTQ0MmJjIn0sImlhdCI6MTY0NTc2NjE4NCwiZXhwIjoxNjQ1NzY5Nzg0fQ.LasSvIgSY3pD_dWOYhOAa2GaSdAsdYWVUwNpZqHum0w',
								},
							},
						},
					},
					400: {
						description: 'Bad request sent',
						content: {
							'text/plain': {
								examples: {
									'Bad password': {
										value: 'Password too short!',
									},
									'Invalid credential inputs': {
										value: 'Bad request...',
									},
								},
							},
						},
					},
					401: {
						description: 'Returns if email input is already used',
						content: {
							'text/plain': {
								example: 'Email already in use!',
							},
						},
					},
					500: {
						description: 'Returns if there is a server error',
						content: {
							'text/plain': {
								example: 'Server error',
							},
						},
					},
				},
			},
		},
	},
};
