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
			description: 'Main API server',
		},
	],
	paths: {
		'/login': {
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
						description: 'Success object for valid credentials',
						content: {
							'application/json': {
								example: {
									user_id: 'UUID HERE',
									first_name: 'John',
									admin: false,
									jwtToken:
										'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDJhNmUwYWQtNGU5NC00MTJiLWJhOWItYjc3MTUxZTQ0MmJjIn0sImlhdCI6MTY0NTc2NjE4NCwiZXhwIjoxNjQ1NzY5Nzg0fQ.LasSvIgSY3pD_dWOYhOAa2GaSdAsdYWVUwNpZqHum0w',
								},
							},
						},
					},
					400: {
						description: 'Bad request body',
						content: {
							'application/json': {
								examples: {
									'Invalid email format': {
										value: 'Invalid Email Format',
									},
									'Missing email or password in request body': {
										value: 'Missing Credentials',
									},
								},
							},
						},
					},
					401: {
						description:
							'Login request went through but failed to authenticate',
						content: {
							'application/json': {
								example: 'Wrong Email or Password',
							},
						},
					},
					500: {
						description: 'Returns if there is a server or database error',
						content: {
							'application/json': {
								example: 'Server Error',
							},
						},
					},
				},
			},
		},
		'/register': {
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
										required: false,
									},
								},
							},
						},
					},
					required: true,
				},
				responses: {
					201: {
						description: 'Successful register',
						content: {
							'application/json': {
								example: {
									user_id: 'UUID HERE',
									first_name: 'John',
									admin: false,
									jwtToken:
										'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMDJhNmUwYWQtNGU5NC00MTJiLWJhOWItYjc3MTUxZTQ0MmJjIn0sImlhdCI6MTY0NTc2NjE4NCwiZXhwIjoxNjQ1NzY5Nzg0fQ.LasSvIgSY3pD_dWOYhOAa2GaSdAsdYWVUwNpZqHum0w',
								},
							},
						},
					},
					400: {
						description: 'Bad request body',
						content: {
							'application/json': {
								examples: {
									'Bad password': {
										value: 'Password too short!',
									},
									'Email already in database': {
										value: 'Email already in use!',
									},
									'Invalid email format': {
										value: 'Invalid Email Format',
									},
									'Missing email or password in request body': {
										value: 'Missing Credentials',
									},
								},
							},
						},
					},
					500: {
						description: 'Returns after server error',
						content: {
							'application/json': {
								example: 'Server Error',
							},
						},
					},
				},
			},
		},
		'/users': {
			get: {
				summary: 'Return user data',
				description: 'returns non-sensitive data for authenticated user',
				responses: {
					200: {
						description: 'Successful request',
						content: {
							'application/json': {
								example: {
									user_id: 'UUID HERE',
									first_name: 'John',
									last_name: 'Doe',
									email: 'johndoe@petrichorcoffee.com',
									admin: false,
								},
							},
						},
					},
					401: {
						description: 'Unauthenticated request',
					},
					403: {
						description: 'Invalid auth token',
					},
					404: {
						description: 'User not found',
					},
					500: {
						description: 'Returns after server error',
						content: {
							'application/json': {
								example: 'Server Error',
							},
						},
					},
				},
			},
			put: {
				summary: 'Update user data',
				description: 'Updates user data in database for authenticated user',
				requestBody: {
					description: 'Takes user info to be updated',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									first_name: {
										description: 'User first name',
										type: 'string',
										required: false,
									},
									last_name: {
										description: 'User last name',
										type: 'string',
										required: false,
									},
									email: {
										description: 'User email',
										type: 'string',
										required: false,
									},
									password: {
										description: 'User password',
										type: 'string',
										required: false,
									},
									phone: {
										description: 'User phone number',
										type: 'string',
										required: false,
									},
								},
							},
						},
					},
					required: true,
				},
				responses: {
					201: {
						description: 'Successful request',
						content: {
							'application/json': {
								example: 'User updated...',
							},
						},
					},
					401: {
						description: 'Authentication failure',
					},
					403: {
						description: 'Invalid auth token',
					},
					404: {
						description: 'User not found',
					},
					500: {
						description: 'Returns after server error',
						content: {
							'application/json': {
								example: 'Server Error',
							},
						},
					},
				},
			},
			delete: {
				summary: 'Delete authenticated user',
				description:
					'Removes all user data from database for authenticated user',
				responses: {
					204: {
						description: 'Successfully deleted user',
					},
					401: {
						description: 'Authentication failure',
					},
					403: {
						description: 'Invalid auth token',
					},
					404: {
						description: 'User not found',
					},
					500: {
						description: 'Server error occured',
					},
				},
			},
		},
	},
};
