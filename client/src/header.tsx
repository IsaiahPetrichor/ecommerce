import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
	return (
		<header>
			<h1>Ecommmerce Website</h1>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/products">Products</Link>
				<Link to="/cart">Cart</Link>
				<Link to="/profile">Profile</Link>
			</nav>
		</header>
	);
}
