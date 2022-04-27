import { FC } from 'react';

interface editUserProps {
	setEditUser: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: editUserProps;
};

const EditUser: FC<props> = ({ props }) => {
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<div className="background">
			<div className="popup admin-popup">
				<h2>Edit User</h2>
				<hr />
				<form onSubmit={handleSubmit}>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={() => props.setEditUser(false)}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditUser;
