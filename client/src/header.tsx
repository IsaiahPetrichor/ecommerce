import { FC } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

interface auth {
	loggedIn: boolean;
}

const Header: FC<auth> = ({ loggedIn }) => {
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
