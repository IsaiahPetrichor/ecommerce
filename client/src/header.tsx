import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import UserContext from './utils/user-context';

const Header: FC = () => {
	const context = useContext(UserContext);

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
