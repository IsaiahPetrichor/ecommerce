import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import UserContext from './utils/user-context';

const Header: FC = () => {
	const loggedIn = useContext(UserContext).user;

	return (
		<header>
			<h1>Ecommmerce Website</h1>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/products">Products</Link>
				<Link to="/cart">Cart</Link>
				{loggedIn ? (
					<Link to="/profile">Profile</Link>
				) : (
					<Link to="/login">Login</Link>
				)}
			</nav>
		</header>
	);
};

export default Header;
