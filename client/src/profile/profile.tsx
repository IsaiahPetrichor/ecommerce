import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../utils/user-context';
import './profile.css';
import { getJwtToken, setJwtToken } from '../utils/util';

export default function Profile() {
	const context = useContext(UserContext);
	const navigate = useNavigate();

	const jwtToken = getJwtToken();
	if (jwtToken === '') navigate('/login');

	useEffect(() => {}, []);

	const signOut = () => {
		setJwtToken('');
		context.updateUser('', '');
		navigate('/');
	};

	return (
		<main className="profile">
			<h2>Your Profile</h2>
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
			</div>
			<button onClick={signOut} className="logout flex">
				Sign Out
			</button>
		</main>
	);
}
