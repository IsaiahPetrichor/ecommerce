import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

const Signup: FC = () => {
	const [email, setEmail] = useState('');
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPass, setVerifyPass] = useState('');

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<main>
			<h2>Sign Up</h2>
			<hr />
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email: </label>
				<input
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
					placeholder="email"
					required
				/>
				<label htmlFor="first">First Name: </label>
				<input
					type="firstname"
					name="firstname"
					value={first}
					onChange={(e) => setFirst(e.currentTarget.value)}
					placeholder="first name"
					required
				/>
				<label htmlFor="last">Last Name: </label>
				<input
					type="lastname"
					name="lastname"
					value={last}
					onChange={(e) => setLast(e.currentTarget.value)}
					placeholder="last name"
					required
				/>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
					placeholder="password"
					required
				/>
				<label htmlFor="verifyPass">Re-enter Password: </label>
				<input
					type="password"
					name="password"
					value={verifyPass}
					onChange={(e) => setVerifyPass(e.currentTarget.value)}
					placeholder="password"
					required
				/>
				<button type="submit">Submit</button>
			</form>
			<p className="register">
				<Link to="/login">Already have an account? Log in here!</Link>
			</p>
		</main>
	);
};

export default Signup;
