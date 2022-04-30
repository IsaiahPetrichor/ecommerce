import React, { FC, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../utils/user-context';
import './login.css';
import { getJwtToken, setJwtToken } from '../utils/util';

const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	let navigate = useNavigate();
	const context = useContext(UserContext);

	useEffect(() => {
		if (getJwtToken() !== '') navigate('/');
	}, [navigate]);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const url = '/api/login/';
		const options: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			credentials: 'include',
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				if (typeof data === 'string') {
					setError(data);
				} else {
					setError('');
					setJwtToken(data.jwt_token);
					context.updateUser(data.user_id, data.first_name, data.admin);
					navigate('/');
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<main className="login">
			<h2>Login</h2>
			<hr />
			{error && <p className="error">{error}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Email:
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						placeholder="email"
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						placeholder="password"
						required
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
			<p className="login-register">
				<Link to="/sign-up">Don't have an account? Sign Up here!</Link>
			</p>
		</main>
	);
};

export default Login;
