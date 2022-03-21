import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<main className="login">
			<h2>Login</h2>
			<hr />
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
