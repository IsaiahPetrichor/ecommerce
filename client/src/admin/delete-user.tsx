import { FC, useEffect, useState } from 'react';
import { getJwtToken } from '../utils/util';

interface deleteUserProps {
	setDeleteUser: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: deleteUserProps;
};

interface User {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	admin: boolean;
}

const DeleteUser: FC<props> = ({ props }) => {
	const [users, setUsers] = useState<User[]>([]);
	const [selected, setSelected] = useState('');

	const jwtToken = getJwtToken();

	useEffect(() => {
		fetch('/api/users/all', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		})
			.then((res) => res.json())
			.then((json) => setUsers(json))
			.catch((err) => console.log(err));
	}, [jwtToken]);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		fetch(`/api/users/admin/${selected}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
		}).then((res) => {
			if (res.status === 204) {
				props.setDeleteUser(false);
				return console.log('Deleted...');
			}
			console.log('Failure...');
		});
	};

	return (
		<div className="background">
			<div className="popup admin-popup">
				<h2>Delete User</h2>
				<hr />
				<form onSubmit={handleSubmit}>
					<label>
						User:
						<select onChange={(e) => setSelected(e.currentTarget.value)}>
							<option value={''}>--Select User--</option>
							{users.map((user) => (
								<option key={user.id} value={user.id}>
									{user.email}
								</option>
							))}
						</select>
					</label>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={() => props.setDeleteUser(false)}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeleteUser;
