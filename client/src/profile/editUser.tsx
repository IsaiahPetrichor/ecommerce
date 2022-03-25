import { FC, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/user-context';
import './submenus.css';

const EditUser: FC = () => {
	const context = useContext(UserContext);

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

	return (
		<main className="sub-user">
			<Link to="/profile" className="back-arrow">
				<i className="bx bx-arrow-back"></i>
			</Link>
			<div className="user-details">
				<p>
					{userData.first_name} {userData.last_name}
				</p>
				<p>{userData.email}</p>
			</div>
		</main>
	);
};

export default EditUser;
