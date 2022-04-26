import { FC, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import UserContext from './utils/user-context';
import { getJwtToken } from './utils/util';

const Header: FC = () => {
	const context = useContext(UserContext);
	const jwtToken = getJwtToken();

	useEffect(() => {
		if (jwtToken !== '') {
			fetch('/api/users/', {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
				credentials: 'include',
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					context.updateUser(data.user_id, data.first_name, data.admin);
				});
		}
	}, [jwtToken, context]);

	return (
		<header>
			<h1>Petrichor Coffee</h1>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/products">Products</Link>
				<Link to="/cart">Cart</Link>
				{context.admin && <Link to="/admin">Admin</Link>}
				{jwtToken !== '' ? (
					<Link to="/profile">{context.first_name}</Link>
				) : (
					<Link to="/login">Login</Link>
				)}
			</nav>
		</header>
	);
};

export default Header;
