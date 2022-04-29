import React, { FC, useEffect, useState } from 'react';
import { getJwtToken } from '../utils/util';

interface editCategoryProps {
	setEditCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

type props = {
	props: editCategoryProps;
};

interface Category {
	id: string;
	name: string;
	description: string;
}

const EditCategory: FC<props> = ({ props }) => {
	const [categories, setCategories] = useState<Category[]>([]);

	const [selectedCategory, setSelectedCategory] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const jwtToken = getJwtToken();

	useEffect(() => {
		fetch('/api/categories')
			.then((res) => res.json())
			.then((json) => {
				setCategories(json);
			});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const category = categories.find(
			(category) => category.id === e.currentTarget.value
		);

		if (category) {
			setSelectedCategory(category.id);
			setName(category.name);
			setDescription(category.description);
		}
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		fetch(`/api/categories/${selectedCategory}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
			},
			body: JSON.stringify({
				name,
				description,
			}),
		}).then((res) => {
			if (res.status === 201) {
				props.setEditCategory(false);
				return console.log('Updated...');
			}
			console.log('Failed...');
		});
	};

	return (
		<div className="background">
			<div className="popup admin-popup">
				<h2>Edit Category</h2>
				<hr />
				<form onSubmit={handleSubmit}>
					<label>
						Category:
						<select onChange={handleChange} required>
							<option value={''}>--Select Category--</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</label>
					<label>
						Name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.currentTarget.value)}
							required
						/>
					</label>
					<label>
						Description:
						<input
							type="text"
							value={description}
							onChange={(e) => setDescription(e.currentTarget.value)}
							required
						/>
					</label>
					<div className="buttons">
						<button type="submit">Submit</button>
						<button onClick={() => props.setEditCategory(false)}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditCategory;
