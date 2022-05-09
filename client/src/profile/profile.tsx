import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../utils/user-context';
import './profile.css';
import { getJwtToken } from '../utils/util';

export default function Profile() {
	const context = useContext(UserContext);
	const navigate = useNavigate();

	const jwtToken = getJwtToken();
	if (!jwtToken) navigate('/login');

	const signOut = () => {
		sessionStorage.removeItem('petrichor-jwtToken');
		sessionStorage.removeItem('petrichor-cart');
		sessionStorage.removeItem('checkout-cart');
		context.updateUser('', '', false);
		navigate('/');
	};

	return (
		<main className="profile">
			<h2>Your Profile</h2>
			<hr />
			<div className="flex user-buttons">
				<Link to="edit-user" className="user">
					<h3>User & Security</h3>
					<p>Edit your name, phone number, or password</p>
				</Link>
				<Link to="orders" className="orders">
					<h3>View Orders</h3>
					<p>View your past orders and process refunds</p>
				</Link>
				<Link to="payments" className="payments">
					<h3>Edit Payments</h3>
					<p>Add or remove payment options</p>
				</Link>
				<Link to="addresses">
					<h3>Address Book</h3>
					<p>Edit or remove addresses on file</p>
				</Link>
			</div>
			<button onClick={signOut} className="logout">
				Sign Out
			</button>
		</main>
	);
}
