import React, { FC, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import UserContext from '../utils/user-context';

const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const context = useContext(UserContext);
	let navigate = useNavigate();

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const url = 'http://localhost:5000/api/login/';
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				if (typeof data === 'string') {
					setError(data);
					context.updateUser('', '', '');
				} else {
					setError('');
					context.updateUser(data.user_id, data.firstName, data.jwtToken);
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
				<label htmlFor="email">Email: </label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
					placeholder="email"
				/>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
					placeholder="password"
				/>
				<button type="submit">Submit</button>
			</form>
			<p className="login-register">
				<Link to="/sign-up">Don't have an account? Sign Up here!</Link>
			</p>
		</main>
	);
};

export default Login;
