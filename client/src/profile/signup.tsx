import { FC, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../utils/user-context';
import './signup.css';

const Signup: FC = () => {
	const [email, setEmail] = useState('');
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPass, setVerifyPass] = useState('');
	const [passMatch, setPassMatch] = useState(false);
	const [error, setError] = useState('');

	const context = useContext(UserContext);
	let navigate = useNavigate();

	useEffect(() => {
		setError('');

		if (password === verifyPass) {
			setPassMatch(true);
		} else {
			setPassMatch(false);
		}
	}, [email, first, last, password, verifyPass]);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (!passMatch) {
			setError('Passwords do not match!');
			return;
		}

		const url = 'http://localhost:5000/api/register/';
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				first_name: first,
				last_name: last,
				password: password,
			}),
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				if (typeof data === 'string') {
					setError(data);
					context.updateUser(false, '', '');
				} else {
					setError('');
					context.updateUser(true, data.firstName, data.jwtToken);
					navigate('/');
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<main className="register">
			<h2>Sign Up</h2>
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
					onChange={(e) => {
						setPassword(e.currentTarget.value);
						if (password.length < 6) return;
					}}
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
			<p className="register-login">
				<Link to="/login">Already have an account? Log in here!</Link>
			</p>
		</main>
	);
};

export default Signup;
