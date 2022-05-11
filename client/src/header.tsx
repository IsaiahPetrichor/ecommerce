import { FC, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import UserContext from './utils/user-context';
import { getJwtToken } from './utils/util';

const Header: FC = () => {
	const context = useContext(UserContext);

	const jwtToken = getJwtToken();

	useEffect(() => {
		fetch('/api/users', {
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		})
			.then((res) => res.json())
			.then((json) =>
				context.updateUser(json.user_id, json.first_name, json.admin)
			);
	}, [jwtToken, context]);

	return (
		<header>
			<h1>Petrichor Coffee</h1>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/products">Products</Link>
				<Link to="/cart">Cart</Link>
				{context.admin && <Link to="/admin">Admin</Link>}
				{context.user_id ? (
					<Link to="/profile">{context.first_name}</Link>
				) : (
					<Link to="/login">Login</Link>
				)}
			</nav>
		</header>
	);
};

export default Header;
