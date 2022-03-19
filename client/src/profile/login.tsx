import React, { FC, useState } from 'react';
import './login.css';

const Login: FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<main>
			<h2>Login</h2>
			<hr />
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username: </label>
				<input
					type="username"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.currentTarget.value)}
					placeholder="username"
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
		</main>
	);
};

export default Login;
