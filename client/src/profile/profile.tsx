import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../utils/user-context';
import './profile.css';

export default function Profile() {
	const context = useContext(UserContext);
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		id: '',
		first_name: '',
		last_name: '',
		email: '',
	});

	useEffect(() => {
		async function getUserData() {
			const user = await fetch(
				`http://localhost:5000/api/users/${context.user_id}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'content-type': 'application/json',
						jwt_token: context.jwt,
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					return data;
				})
				.catch((err) => {
					console.log(err.message);
				});

			setUserData(user);
		}

		getUserData();
	}, [context]);

	const signOut = () => {
		context.updateUser('', '', '');
		navigate('/');
	};

	return (
		<main className="profile">
			<h2>Your Profile</h2>
			<div className="flex">
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
			<button onClick={signOut} className="logout">
				Sign Out
			</button>
		</main>
	);
}
