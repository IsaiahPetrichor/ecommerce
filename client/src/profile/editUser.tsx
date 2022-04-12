import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getJwtToken } from '../utils/util';
import './submenus.css';
import './editUser.css';

const EditUser: FC = () => {
	const jwtToken = getJwtToken();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newPass, setNewPass] = useState('');
	const [verifyNew, setVerifyNew] = useState('');

	const [changePassword, setChangePassword] = useState(false);
	const [editing, setEditing] = useState(false);
	const [error, setError] = useState('');

	if (!jwtToken) navigate('/login');

	useEffect(() => {
		async function getUserData() {
			fetch(`/api/users/`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setFirstName(data.first_name);
					setLastName(data.last_name);
					setEmail(data.email);
				})
				.catch((err) => {
					console.log(err.message);
				});
		}

		getUserData();
	}, [jwtToken, editing]);

	const handlePassSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (error) return;

		if (newPass !== verifyNew) return setError('Passwords do not match!');

		const options: RequestInit = {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				currentPassword: password,
				newPassword: newPass,
			}),
			credentials: 'include',
		};

		fetch('/api/users', options)
			.then((response) => {
				if ([401, 403].includes(response.status)) {
					return setError('Wrong Password!');
				}
				if (response.status === 500) {
					return setError('Server Error...');
				}
				setChangePassword(false);
				setPassword('');
				setNewPass('');
				setVerifyNew('');
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	const handleEditSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (error) return;

		fetch('/api/users', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				setEditing(false);
				setPassword('');
			})
			.catch((err) => console.log(err.message));
	};

	return (
		<main className="sub-user">
			<Link to="/profile" className="back-arrow">
				<i className="bx bx-arrow-back"></i>
			</Link>
			<div className="user-details">
				<h2>
					Welcome, {firstName} {lastName}!
				</h2>
				<hr />
				<p>
					<strong>First Name: </strong>
					{firstName}
				</p>
				<p>
					<strong>Last Name: </strong>
					{lastName}
				</p>
				<p>
					<strong>Email: </strong>
					{email}
				</p>
				<p>
					<strong>Password: </strong>
					************
					<button
						className="pass-button"
						onClick={() => setChangePassword(true)}>
						Change Password
					</button>
				</p>
				<hr />
				<button className="edit-button" onClick={() => setEditing(true)}>
					Edit Profile
				</button>
			</div>
			{editing && (
				<div className="background">
					<div className="popup">
						<h2>Edit Profile</h2>
						<hr />
						{error && <p className="error">{error}</p>}
						<form onSubmit={handleEditSubmit}>
							<label htmlFor="first-name">First Name: </label>
							<input
								id="first-name"
								type="text"
								value={firstName}
								onChange={(e) => {
									setFirstName(e.currentTarget.value);
									setError('');
								}}
								required
							/>
							<label htmlFor="last-name">Last Name: </label>
							<input
								id="last-name"
								type="text"
								value={lastName}
								onChange={(e) => {
									setLastName(e.currentTarget.value);
									setError('');
								}}
								required
							/>
							<label htmlFor="email">Email: </label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => {
									setEmail(e.currentTarget.value);
									setError('');
								}}
								required
							/>
							<label htmlFor="password">Password: </label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.currentTarget.value);
									setError('');
								}}
								required
							/>
							<div className="buttons">
								<button type="submit">Save</button>
								<button
									onClick={() => {
										setEditing(false);
										setError('');
										setPassword('');
									}}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{changePassword && (
				<div className="background">
					<div className="popup">
						<h2>Change Password</h2>
						<hr />
						{error && <p className="error">{error}</p>}
						<form onSubmit={handlePassSubmit}>
							<label htmlFor="current-pass">Current Password: </label>
							<input
								id="current-pass"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.currentTarget.value);
									setError('');
								}}
								required
							/>
							<label htmlFor="new-pass">New Password: </label>
							<input
								id="new-pass"
								type="password"
								value={newPass}
								onChange={(e) => {
									setNewPass(e.currentTarget.value);
									setError('');
								}}
								required
							/>
							<label htmlFor="verify-new-pass">Verify New Password: </label>
							<input
								id="verify-new-pass"
								type="password"
								value={verifyNew}
								onChange={(e) => {
									setVerifyNew(e.currentTarget.value);
									setError('');
								}}
								required
							/>
							<div className="buttons">
								<button type="submit">Save</button>
								<button
									onClick={() => {
										setChangePassword(false);
										setError('');
										setPassword('');
										setNewPass('');
										setVerifyNew('');
									}}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</main>
	);
};

export default EditUser;
