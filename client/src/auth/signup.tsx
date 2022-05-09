import { FC, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../utils/user-context';
import { getJwtToken, setJwtToken } from '../utils/util';
import './signup.css';

interface Product {
	product_id: string;
	quantity: number;
}

const Signup: FC = () => {
	const [email, setEmail] = useState('');
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPass, setVerifyPass] = useState('');
	const [passMatch, setPassMatch] = useState(false);
	const [error, setError] = useState('');

	const jwtToken = getJwtToken();

	const context = useContext(UserContext);
	let navigate = useNavigate();

	useEffect(() => {
		if (jwtToken !== '') {
			navigate('/');
		}

		setError('');

		if (password === verifyPass) {
			setPassMatch(true);
		} else {
			setPassMatch(false);
		}
	}, [email, first, last, password, verifyPass, navigate, jwtToken]);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (!passMatch) {
			setError('Passwords do not match!');
			return;
		}

		const url = '/api/register/';
		const options: RequestInit = {
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
			credentials: 'include',
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				if (typeof data === 'string') {
					setError(data);
					context.updateUser('', '', false);
				} else {
					setError('');
					context.updateUser(data.user_id, data.first_name, data.admin);
					setJwtToken(data.jwt_token);
					navigate('/');

					const jwtToken = getJwtToken();
					let cart;

					if (sessionStorage.getItem('petrichor-cart'))
						cart = sessionStorage.getItem('petrichor-cart');

					if (cart) {
						JSON.parse(cart).forEach((product: Product) =>
							fetch('/api/cart', {
								method: 'POST',
								headers: {
									Accept: 'application/json',
									'content-type': 'application/json',
									Authorization: `Bearer ${jwtToken}`,
								},
								body: JSON.stringify({
									product_id: product.product_id,
									quantity: product.quantity,
								}),
							})
						);
					}
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
					First Name:
					<input
						type="firstname"
						name="firstname"
						value={first}
						onChange={(e) => setFirst(e.currentTarget.value)}
						placeholder="first name"
						required
					/>
				</label>
				<label>
					Last Name:
					<input
						type="lastname"
						name="lastname"
						value={last}
						onChange={(e) => setLast(e.currentTarget.value)}
						placeholder="last name"
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => {
							setPassword(e.currentTarget.value);
						}}
						placeholder="password"
						required
					/>
				</label>
				<label>
					Re-enter Password:
					<input
						type="password"
						name="password"
						value={verifyPass}
						onChange={(e) => setVerifyPass(e.currentTarget.value)}
						placeholder="password"
						required
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
			<p className="register-login">
				<Link to="/login">Already have an account? Log in here!</Link>
			</p>
		</main>
	);
};

export default Signup;
