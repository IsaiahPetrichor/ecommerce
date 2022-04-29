import { FC } from 'react';

interface deleteCategoryProps {
	setDeleteCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: deleteCategoryProps;
};

const DeleteCategory: FC<props> = ({ props }) => {
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<div className="background">
			<div className="popup admin-popup">
				<h2>Delete Category</h2>
				<hr />
				<form onSubmit={handleSubmit}>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={() => props.setDeleteCategory(false)}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeleteCategory;
