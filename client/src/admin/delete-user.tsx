import { FC } from 'react';

interface deleteUserProps {
	setDeleteUser: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: deleteUserProps;
};

const DeleteUser: FC<props> = ({ props }) => {
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<div className="background">
			<div className="popup admin-popup">
				<h2>Delete User</h2>
				<hr />
				<form onSubmit={handleSubmit}>
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
