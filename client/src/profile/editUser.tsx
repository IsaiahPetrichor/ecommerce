import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJwtToken } from '../utils/util';
import './submenus.css';

const EditUser: FC = () => {
	const jwtToken = getJwtToken();

	const [userData, setUserData] = useState({
		id: '',
		first_name: '',
		last_name: '',
		email: '',
	});

	useEffect(() => {
		async function getUserData() {
			const user = await fetch(`/api/users/`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
			})
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
	}, [jwtToken]);

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
